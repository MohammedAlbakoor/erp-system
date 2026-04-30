<?php

namespace App\Notifications;

use App\Models\Product;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class LowStockNotification extends Notification
{
    use Queueable;

    public function __construct(
        private Product $product,
    ) {}

    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Low Stock Alert: ' . $this->product->name)
            ->line("Product '{$this->product->name}' (SKU: {$this->product->sku}) is running low on stock.")
            ->line("Current stock: {$this->product->total_stock} | Reorder level: {$this->product->reorder_level}")
            ->action('View Product', url('/products/' . $this->product->id))
            ->line('Please reorder this product soon.');
    }

    public function toArray(object $notifiable): array
    {
        return [
            'type' => 'low_stock',
            'product_id' => $this->product->id,
            'product_name' => $this->product->name,
            'sku' => $this->product->sku,
            'current_stock' => $this->product->total_stock,
            'reorder_level' => $this->product->reorder_level,
            'message' => "Low stock alert for {$this->product->name}",
        ];
    }
}
