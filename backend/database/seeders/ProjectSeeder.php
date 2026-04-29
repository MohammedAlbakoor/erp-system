<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\Task;
use App\Models\User;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    public function run(): void
    {
        $users = User::all();

        $projects = [
            [
                'name' => 'Website Redesign',
                'description' => 'Complete overhaul of the corporate website with modern design',
                'start_date' => now()->subMonths(2),
                'end_date' => now()->addMonths(1),
                'budget' => 45000,
                'status' => 'in_progress',
                'priority' => 'high',
                'progress' => 65,
            ],
            [
                'name' => 'Mobile App Development',
                'description' => 'Build iOS and Android mobile application for customers',
                'start_date' => now()->subMonth(),
                'end_date' => now()->addMonths(4),
                'budget' => 120000,
                'status' => 'in_progress',
                'priority' => 'critical',
                'progress' => 30,
            ],
            [
                'name' => 'Data Migration',
                'description' => 'Migrate legacy data to the new ERP system',
                'start_date' => now()->subMonths(3),
                'end_date' => now()->subWeek(),
                'budget' => 25000,
                'status' => 'completed',
                'priority' => 'high',
                'progress' => 100,
            ],
            [
                'name' => 'Security Audit',
                'description' => 'Comprehensive security assessment and remediation',
                'start_date' => now()->addWeek(),
                'end_date' => now()->addMonths(2),
                'budget' => 30000,
                'status' => 'planning',
                'priority' => 'medium',
                'progress' => 0,
            ],
        ];

        foreach ($projects as $projectData) {
            $projectData['manager_id'] = $users->random()->id;
            $project = Project::create($projectData);

            $taskStatuses = ['todo', 'in_progress', 'in_review', 'done'];
            $taskTemplates = [
                ['title' => 'Requirements gathering', 'priority' => 'high', 'estimated_hours' => 16],
                ['title' => 'Design mockups', 'priority' => 'high', 'estimated_hours' => 24],
                ['title' => 'Backend development', 'priority' => 'critical', 'estimated_hours' => 40],
                ['title' => 'Frontend development', 'priority' => 'critical', 'estimated_hours' => 40],
                ['title' => 'Testing', 'priority' => 'high', 'estimated_hours' => 20],
                ['title' => 'Documentation', 'priority' => 'medium', 'estimated_hours' => 8],
                ['title' => 'Deployment', 'priority' => 'medium', 'estimated_hours' => 4],
            ];

            foreach ($taskTemplates as $i => $taskData) {
                $status = $taskStatuses[array_rand($taskStatuses)];
                Task::create([
                    'title' => $taskData['title'],
                    'description' => "Task for {$project->name}: {$taskData['title']}",
                    'project_id' => $project->id,
                    'assigned_to' => $users->random()->id,
                    'status' => $status,
                    'priority' => $taskData['priority'],
                    'estimated_hours' => $taskData['estimated_hours'],
                    'progress' => $status === 'done' ? 100 : ($status === 'in_review' ? 80 : ($status === 'in_progress' ? rand(20, 60) : 0)),
                    'sort_order' => $i,
                    'start_date' => now()->subDays(rand(1, 30)),
                    'due_date' => now()->addDays(rand(1, 30)),
                ]);
            }
        }
    }
}
