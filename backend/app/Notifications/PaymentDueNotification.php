<?php

namespace App\Notifications;

use App\Models\Invoice;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class PaymentDueNotification extends Notification
{
    use Queueable;

    public function __construct(
        private Invoice $invoice,
    ) {}

    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Payment Due: Invoice ' . $this->invoice->number)
            ->line("Invoice {$this->invoice->number} is due on {$this->invoice->due_date->format('M d, Y')}.")
            ->line("Amount due: $" . number_format($this->invoice->balance_due, 2))
            ->action('View Invoice', url('/invoices/' . $this->invoice->id))
            ->line('Please process payment at your earliest convenience.');
    }

    public function toArray(object $notifiable): array
    {
        return [
            'type' => 'payment_due',
            'invoice_id' => $this->invoice->id,
            'invoice_number' => $this->invoice->number,
            'amount_due' => $this->invoice->balance_due,
            'due_date' => $this->invoice->due_date->toDateString(),
            'message' => "Payment due for invoice {$this->invoice->number}",
        ];
    }
}
