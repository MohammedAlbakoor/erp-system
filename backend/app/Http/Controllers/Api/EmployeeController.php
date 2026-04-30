<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Employee;
use App\Models\LeaveRequest;
use App\Repositories\EmployeeRepository;
use App\Services\HRService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    public function __construct(
        private EmployeeRepository $employeeRepository,
        private HRService $hrService,
    ) {}

    public function index(Request $request): JsonResponse
    {
        $filters = $request->only(['search', 'department_id', 'status']);
        $employees = $this->employeeRepository->paginate($request->get('per_page', 15), $filters);
        return response()->json($employees);
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'user_id' => 'required|exists:users,id',
            'employee_id' => 'required|string|unique:employees',
            'department_id' => 'nullable|exists:departments,id',
            'position' => 'required|string|max:255',
            'hire_date' => 'required|date',
            'birth_date' => 'nullable|date',
            'gender' => 'nullable|in:male,female,other',
            'national_id' => 'nullable|string|max:50',
            'address' => 'nullable|string',
            'emergency_contact_name' => 'nullable|string|max:255',
            'emergency_contact_phone' => 'nullable|string|max:20',
            'base_salary' => 'required|numeric|min:0',
            'employment_type' => 'nullable|in:full_time,part_time,contract,intern',
        ]);

        $employee = $this->employeeRepository->create($data);
        return response()->json($employee->load('user', 'department'), 201);
    }

    public function show(int $id): JsonResponse
    {
        $employee = $this->employeeRepository->findOrFail($id, ['user', 'department', 'attendance', 'leaveRequests', 'payrolls']);
        return response()->json($employee);
    }

    public function update(Request $request, int $id): JsonResponse
    {
        $data = $request->validate([
            'department_id' => 'nullable|exists:departments,id',
            'position' => 'sometimes|string|max:255',
            'base_salary' => 'sometimes|numeric|min:0',
            'employment_type' => 'nullable|in:full_time,part_time,contract,intern',
            'status' => 'sometimes|in:active,on_leave,terminated,resigned',
        ]);

        $employee = $this->employeeRepository->update($id, $data);
        return response()->json($employee);
    }

    public function checkIn(int $id): JsonResponse
    {
        $attendance = $this->hrService->checkIn($id);
        return response()->json($attendance, 201);
    }

    public function checkOut(int $id): JsonResponse
    {
        $attendance = $this->hrService->checkOut($id);
        return response()->json($attendance);
    }

    public function requestLeave(Request $request, int $id): JsonResponse
    {
        $data = $request->validate([
            'leave_type_id' => 'required|exists:leave_types,id',
            'start_date' => 'required|date|after_or_equal:today',
            'end_date' => 'required|date|after_or_equal:start_date',
            'reason' => 'nullable|string',
        ]);

        $data['employee_id'] = $id;
        $leaveRequest = $this->hrService->requestLeave($data);
        return response()->json($leaveRequest, 201);
    }

    public function approveLeave(int $id, int $leaveId): JsonResponse
    {
        $leaveRequest = LeaveRequest::findOrFail($leaveId);
        $this->hrService->approveLeave($leaveRequest, auth()->id());
        return response()->json($leaveRequest->fresh());
    }

    public function rejectLeave(Request $request, int $id, int $leaveId): JsonResponse
    {
        $request->validate(['reason' => 'required|string']);
        $leaveRequest = LeaveRequest::findOrFail($leaveId);
        $this->hrService->rejectLeave($leaveRequest, auth()->id(), $request->reason);
        return response()->json($leaveRequest->fresh());
    }

    public function generatePayroll(Request $request, int $id): JsonResponse
    {
        $request->validate(['period' => 'required|string']);
        $payroll = $this->hrService->generatePayroll($id, $request->period);
        return response()->json($payroll, 201);
    }
}
