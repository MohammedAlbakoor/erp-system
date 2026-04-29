<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\Task;
use App\Models\TaskComment;
use App\Repositories\ProjectRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function __construct(
        private ProjectRepository $projectRepository,
    ) {}

    public function index(Request $request): JsonResponse
    {
        $filters = $request->only(['search', 'status', 'manager_id', 'priority']);
        $projects = $this->projectRepository->paginate($request->get('per_page', 15), $filters);
        return response()->json($projects);
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'manager_id' => 'nullable|exists:users,id',
            'customer_id' => 'nullable|exists:customers,id',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'budget' => 'nullable|numeric|min:0',
            'priority' => 'nullable|in:low,medium,high,critical',
        ]);

        $project = $this->projectRepository->create($data);
        return response()->json($project, 201);
    }

    public function show(int $id): JsonResponse
    {
        $project = $this->projectRepository->findOrFail($id, ['tasks.assignee', 'manager', 'customer']);
        return response()->json($project);
    }

    public function update(Request $request, int $id): JsonResponse
    {
        $data = $request->validate([
            'name' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'manager_id' => 'nullable|exists:users,id',
            'start_date' => 'sometimes|date',
            'end_date' => 'nullable|date',
            'budget' => 'nullable|numeric|min:0',
            'status' => 'sometimes|in:planning,in_progress,on_hold,completed,cancelled',
            'priority' => 'nullable|in:low,medium,high,critical',
        ]);

        $project = $this->projectRepository->update($id, $data);
        return response()->json($project);
    }

    public function destroy(int $id): JsonResponse
    {
        $this->projectRepository->delete($id);
        return response()->json(null, 204);
    }

    public function tasks(int $projectId): JsonResponse
    {
        $tasks = Task::where('project_id', $projectId)
            ->with('assignee', 'subtasks')
            ->orderBy('sort_order')
            ->get();
        return response()->json($tasks);
    }

    public function storeTask(Request $request, int $projectId): JsonResponse
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'assigned_to' => 'nullable|exists:users,id',
            'parent_id' => 'nullable|exists:tasks,id',
            'status' => 'nullable|in:todo,in_progress,in_review,done',
            'priority' => 'nullable|in:low,medium,high,critical',
            'start_date' => 'nullable|date',
            'due_date' => 'nullable|date',
            'estimated_hours' => 'nullable|integer|min:0',
        ]);

        $data['project_id'] = $projectId;
        $task = Task::create($data);

        return response()->json($task->load('assignee'), 201);
    }

    public function updateTask(Request $request, int $projectId, int $taskId): JsonResponse
    {
        $data = $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'assigned_to' => 'nullable|exists:users,id',
            'status' => 'sometimes|in:todo,in_progress,in_review,done',
            'priority' => 'nullable|in:low,medium,high,critical',
            'progress' => 'nullable|integer|min:0|max:100',
            'actual_hours' => 'nullable|integer|min:0',
            'sort_order' => 'nullable|integer',
        ]);

        $task = Task::where('project_id', $projectId)->findOrFail($taskId);
        $task->update($data);

        $project = Project::find($projectId);
        $project->updateProgress();

        return response()->json($task->fresh('assignee'));
    }

    public function deleteTask(int $projectId, int $taskId): JsonResponse
    {
        Task::where('project_id', $projectId)->findOrFail($taskId)->delete();
        return response()->json(null, 204);
    }

    public function kanban(int $projectId): JsonResponse
    {
        $tasks = Task::where('project_id', $projectId)
            ->with('assignee')
            ->orderBy('sort_order')
            ->get()
            ->groupBy('status');

        return response()->json([
            'todo' => $tasks->get('todo', collect()),
            'in_progress' => $tasks->get('in_progress', collect()),
            'in_review' => $tasks->get('in_review', collect()),
            'done' => $tasks->get('done', collect()),
        ]);
    }
}
