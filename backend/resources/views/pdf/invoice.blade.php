<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Invoice {{ $invoice->number }}</title>
    <style>
        body { font-family: Arial, sans-serif; font-size: 12px; color: #333; }
        .header { display: flex; justify-content: space-between; margin-bottom: 30px; }
        .company-name { font-size: 24px; font-weight: bold; color: #1a56db; }
        .invoice-title { font-size: 28px; color: #666; text-align: right; }
        .info-table { width: 100%; margin-bottom: 20px; }
        .info-table td { padding: 4px 8px; vertical-align: top; }
        .label { font-weight: bold; color: #555; }
        table.items { width: 100%; border-collapse: collapse; margin: 20px 0; }
        table.items th { background: #1a56db; color: white; padding: 10px; text-align: left; }
        table.items td { padding: 8px 10px; border-bottom: 1px solid #eee; }
        table.items tr:nth-child(even) { background: #f9f9f9; }
        .totals { float: right; width: 300px; }
        .totals table { width: 100%; }
        .totals td { padding: 6px 10px; }
        .totals .grand-total { font-size: 16px; font-weight: bold; border-top: 2px solid #333; }
        .footer { margin-top: 50px; text-align: center; color: #999; font-size: 10px; }
        .status { display: inline-block; padding: 4px 12px; border-radius: 4px; font-weight: bold; text-transform: uppercase; }
        .status-paid { background: #d4edda; color: #155724; }
        .status-pending { background: #fff3cd; color: #856404; }
    </style>
</head>
<body>
    <table style="width:100%"><tr>
        <td><div class="company-name">ERP Enterprise</div><div>123 Business Ave, Suite 100<br>New York, NY 10001</div></td>
        <td style="text-align:right"><div class="invoice-title">INVOICE</div><div style="font-size:14px">#{{ $invoice->number }}</div></td>
    </tr></table>

    <hr style="border:1px solid #1a56db;margin:20px 0">

    <table class="info-table"><tr>
        <td width="50%">
            <span class="label">Bill To:</span><br>
            {{ $invoice->customer->name }}<br>
            {{ $invoice->customer->company }}<br>
            {{ $invoice->customer->address }}<br>
            {{ $invoice->customer->city }}, {{ $invoice->customer->country }}
        </td>
        <td width="50%" style="text-align:right">
            <span class="label">Invoice Date:</span> {{ $invoice->date->format('M d, Y') }}<br>
            <span class="label">Due Date:</span> {{ $invoice->due_date->format('M d, Y') }}<br>
            <span class="label">Status:</span>
            <span class="status status-{{ $invoice->status }}">{{ ucfirst($invoice->status) }}</span>
        </td>
    </tr></table>

    <table class="items">
        <thead><tr>
            <th>#</th><th>Description</th><th>Qty</th><th>Unit Price</th><th>Tax</th><th>Total</th>
        </tr></thead>
        <tbody>
            @foreach($invoice->items as $i => $item)
            <tr>
                <td>{{ $i + 1 }}</td>
                <td>{{ $item->description }}</td>
                <td>{{ $item->quantity }}</td>
                <td>${{ number_format($item->unit_price, 2) }}</td>
                <td>${{ number_format($item->tax, 2) }}</td>
                <td>${{ number_format($item->total, 2) }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>

    <div class="totals">
        <table>
            <tr><td>Subtotal:</td><td style="text-align:right">${{ number_format($invoice->subtotal, 2) }}</td></tr>
            <tr><td>Tax:</td><td style="text-align:right">${{ number_format($invoice->tax, 2) }}</td></tr>
            <tr><td>Discount:</td><td style="text-align:right">-${{ number_format($invoice->discount, 2) }}</td></tr>
            <tr class="grand-total"><td>Total:</td><td style="text-align:right">${{ number_format($invoice->total, 2) }}</td></tr>
            <tr><td>Amount Paid:</td><td style="text-align:right">${{ number_format($invoice->amount_paid, 2) }}</td></tr>
            <tr class="grand-total"><td>Balance Due:</td><td style="text-align:right">${{ number_format($invoice->balance_due, 2) }}</td></tr>
        </table>
    </div>

    <div style="clear:both"></div>

    @if($invoice->notes)
    <div style="margin-top:30px"><span class="label">Notes:</span><br>{{ $invoice->notes }}</div>
    @endif

    <div class="footer">
        <p>Thank you for your business!</p>
        <p>ERP Enterprise &bull; admin@erp.com &bull; +1-555-0000</p>
    </div>
</body>
</html>
