<?php

namespace App\Notifications;

use App\Models\LeaveRequest;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class LeaveRequestNotification extends Notification
{
    use Queueable;

    public function __construct(
        private LeaveRequest $leaveRequest,
        private string $action,
    ) {}

    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        $status = ucfirst($this->action);
        return (new MailMessage)
            ->subject("Leave Request {$status}")
            ->line("Your leave request has been {$this->action}.")
            ->line("From: {$this->leaveRequest->start_date->format('M d, Y')} to {$this->leaveRequest->end_date->format('M d, Y')}")
            ->line("Duration: {$this->leaveRequest->days} day(s)")
            ->action('View Details', url('/hr/leave-requests'));
    }

    public function toArray(object $notifiable): array
    {
        return [
            'type' => 'leave_request',
            'leave_request_id' => $this->leaveRequest->id,
            'action' => $this->action,
            'start_date' => $this->leaveRequest->start_date->toDateString(),
            'end_date' => $this->leaveRequest->end_date->toDateString(),
            'message' => "Leave request {$this->action}",
        ];
    }
}
