<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Invoice;
use App\Repositories\InvoiceRepository;
use App\Services\InvoiceService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class InvoiceController extends Controller
{
    public function __construct(
        private InvoiceRepository $invoiceRepository,
        private InvoiceService $invoiceService,
    ) {}

    public function index(Request $request): JsonResponse
    {
        $filters = $request->only(['customer_id', 'status', 'date_from', 'date_to']);
        $invoices = $this->invoiceRepository->paginate($request->get('per_page', 15), $filters);
        return response()->json($invoices);
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'customer_id' => 'required|exists:customers,id',
            'sales_order_id' => 'nullable|exists:sales_orders,id',
            'date' => 'required|date',
            'due_date' => 'required|date|after_or_equal:date',
            'tax' => 'nullable|numeric|min:0',
            'discount' => 'nullable|numeric|min:0',
            'notes' => 'nullable|string',
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'nullable|exists:products,id',
            'items.*.description' => 'required|string',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.unit_price' => 'required|numeric|min:0',
            'items.*.discount' => 'nullable|numeric|min:0',
            'items.*.tax' => 'nullable|numeric|min:0',
        ]);

        $items = $data['items'];
        unset($data['items']);

        $invoice = $this->invoiceService->createInvoice($data, $items);
        return response()->json($invoice, 201);
    }

    public function show(int $id): JsonResponse
    {
        $invoice = $this->invoiceRepository->findOrFail($id, ['items.product', 'customer', 'payments', 'creator']);
        return response()->json($invoice);
    }

    public function update(Request $request, int $id): JsonResponse
    {
        $data = $request->validate([
            'status' => 'sometimes|in:draft,sent,paid,partially_paid,overdue,cancelled',
            'notes' => 'nullable|string',
        ]);

        $invoice = $this->invoiceRepository->update($id, $data);
        return response()->json($invoice);
    }

    public function destroy(int $id): JsonResponse
    {
        $this->invoiceRepository->delete($id);
        return response()->json(null, 204);
    }

    public function recordPayment(Request $request, int $id): JsonResponse
    {
        $data = $request->validate([
            'amount' => 'required|numeric|min:0.01',
            'payment_date' => 'required|date',
            'method' => 'required|in:cash,bank_transfer,credit_card,check,other',
            'reference' => 'nullable|string',
            'notes' => 'nullable|string',
        ]);

        $invoice = Invoice::findOrFail($id);
        $data['status'] = 'completed';
        $this->invoiceService->recordPayment($invoice, $data);

        return response()->json($invoice->fresh(['payments']));
    }

    public function downloadPdf(int $id): Response
    {
        $invoice = Invoice::findOrFail($id);
        $pdf = $this->invoiceService->generatePdf($invoice);
        return $pdf->download("invoice-{$invoice->number}.pdf");
    }
}
