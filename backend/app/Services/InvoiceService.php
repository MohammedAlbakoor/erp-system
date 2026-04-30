<?php

namespace App\Services;

use App\Models\Invoice;
use App\Repositories\InvoiceRepository;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Str;

class InvoiceService
{
    public function __construct(
        private InvoiceRepository $invoiceRepository,
    ) {}

    public function createInvoice(array $data, array $items): Invoice
    {
        $data['number'] = $this->generateInvoiceNumber();
        $data['created_by'] = auth()->id();

        $subtotal = 0;
        foreach ($items as &$item) {
            $item['total'] = ($item['quantity'] * $item['unit_price']) - ($item['discount'] ?? 0) + ($item['tax'] ?? 0);
            $subtotal += $item['total'];
        }

        $data['subtotal'] = $subtotal;
        $data['total'] = $subtotal - ($data['discount'] ?? 0) + ($data['tax'] ?? 0);

        $invoice = $this->invoiceRepository->create($data);
        $invoice->items()->createMany($items);

        return $invoice->load('items', 'customer');
    }

    public function generatePdf(Invoice $invoice): \Barryvdh\DomPDF\PDF
    {
        $invoice->load('items.product', 'customer', 'payments');
        return Pdf::loadView('pdf.invoice', compact('invoice'));
    }

    public function recordPayment(Invoice $invoice, array $paymentData): void
    {
        $paymentData['number'] = 'PAY-' . strtoupper(Str::random(8));
        $paymentData['created_by'] = auth()->id();

        $invoice->payments()->create($paymentData);

        $totalPaid = $invoice->payments()->where('status', 'completed')->sum('amount');
        $invoice->amount_paid = $totalPaid;

        if ($totalPaid >= $invoice->total) {
            $invoice->status = 'paid';
        } elseif ($totalPaid > 0) {
            $invoice->status = 'partially_paid';
        }

        $invoice->save();
    }

    private function generateInvoiceNumber(): string
    {
        $latest = Invoice::orderBy('id', 'desc')->first();
        $number = $latest ? intval(substr($latest->number, 4)) + 1 : 1;
        return 'INV-' . str_pad($number, 6, '0', STR_PAD_LEFT);
    }
}
