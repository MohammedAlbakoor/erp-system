<?php

namespace App\Services;

use App\Models\Attendance;
use App\Models\Employee;
use App\Models\LeaveRequest;
use App\Models\Payroll;
use App\Repositories\EmployeeRepository;

class HRService
{
    public function __construct(
        private EmployeeRepository $employeeRepository,
    ) {}

    public function checkIn(int $employeeId): Attendance
    {
        return Attendance::create([
            'employee_id' => $employeeId,
            'date' => now()->toDateString(),
            'check_in' => now()->toTimeString(),
            'status' => 'present',
        ]);
    }

    public function checkOut(int $employeeId): Attendance
    {
        $attendance = Attendance::where('employee_id', $employeeId)
            ->where('date', now()->toDateString())
            ->firstOrFail();

        $checkIn = \Carbon\Carbon::parse($attendance->check_in);
        $checkOut = now();
        $hoursWorked = $checkIn->diffInMinutes($checkOut) / 60;

        $attendance->update([
            'check_out' => $checkOut->toTimeString(),
            'hours_worked' => round($hoursWorked, 2),
        ]);

        return $attendance;
    }

    public function requestLeave(array $data): LeaveRequest
    {
        $startDate = \Carbon\Carbon::parse($data['start_date']);
        $endDate = \Carbon\Carbon::parse($data['end_date']);
        $data['days'] = $startDate->diffInDays($endDate) + 1;

        return LeaveRequest::create($data);
    }

    public function approveLeave(LeaveRequest $leaveRequest, int $approverId): void
    {
        $leaveRequest->update([
            'status' => 'approved',
            'approved_by' => $approverId,
        ]);
    }

    public function rejectLeave(LeaveRequest $leaveRequest, int $approverId, string $reason): void
    {
        $leaveRequest->update([
            'status' => 'rejected',
            'approved_by' => $approverId,
            'rejection_reason' => $reason,
        ]);
    }

    public function generatePayroll(int $employeeId, string $period): Payroll
    {
        $employee = Employee::findOrFail($employeeId);

        $baseSalary = (float) $employee->base_salary;
        $overtime = 0;
        $bonuses = 0;
        $deductions = 0;
        $tax = $baseSalary * 0.1;
        $netSalary = $baseSalary + $overtime + $bonuses - $deductions - $tax;

        return Payroll::create([
            'employee_id' => $employeeId,
            'period' => $period,
            'base_salary' => $baseSalary,
            'overtime' => $overtime,
            'bonuses' => $bonuses,
            'deductions' => $deductions,
            'tax' => $tax,
            'net_salary' => $netSalary,
            'status' => 'draft',
        ]);
    }
}
