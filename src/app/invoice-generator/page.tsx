'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export default function InvoiceGenerator() {
  const [invoice, setInvoice] = useState({
    invoiceNumber: 'INV-001',
    invoiceDate: new Date().toISOString().split('T')[0],
    dueDate: '',
    yourName: '',
    yourEmail: '',
    clientName: '',
    clientEmail: '',
    items: [{ description: '', quantity: 1, rate: 0, tax: 0 }],
    notes: '',
  });

  const handleItemChange = (index: number, field: string, value: any) => {
    const newItems = [...invoice.items];
    newItems[index][field] = value;
    setInvoice({ ...invoice, items: newItems });
  };

  const addItem = () => {
    setInvoice({
      ...invoice,
      items: [
        ...invoice.items,
        { description: '', quantity: 1, rate: 0, tax: 0 },
      ],
    });
  };

  const removeItem = (index: number) => {
    const newItems = invoice.items.filter((_, i) => i !== index);
    setInvoice({ ...invoice, items: newItems });
  };

  const calculateTotals = () => {
    let subtotal = 0;
    let totalTax = 0;
    invoice.items.forEach(item => {
      const itemTotal = item.quantity * item.rate;
      subtotal += itemTotal;
      totalTax += (item.tax / 100) * itemTotal;
    });
    return {
      subtotal,
      totalTax,
      total: subtotal + totalTax,
    };
  };

  const { subtotal, totalTax, total } = calculateTotals();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Invoice Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Invoice Number"
              value={invoice.invoiceNumber}
              onChange={e =>
                setInvoice({ ...invoice, invoiceNumber: e.target.value })
              }
            />
            <Input
              type="date"
              value={invoice.invoiceDate}
              onChange={e =>
                setInvoice({ ...invoice, invoiceDate: e.target.value })
              }
            />
          </div>

          <Input
            type="date"
            placeholder="Due Date"
            value={invoice.dueDate}
            onChange={e => setInvoice({ ...invoice, dueDate: e.target.value })}
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Your Name"
              value={invoice.yourName}
              onChange={e =>
                setInvoice({ ...invoice, yourName: e.target.value })
              }
            />
            <Input
              placeholder="Your Email"
              value={invoice.yourEmail}
              onChange={e =>
                setInvoice({ ...invoice, yourEmail: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Client Name"
              value={invoice.clientName}
              onChange={e =>
                setInvoice({ ...invoice, clientName: e.target.value })
              }
            />
            <Input
              placeholder="Client Email"
              value={invoice.clientEmail}
              onChange={e =>
                setInvoice({ ...invoice, clientEmail: e.target.value })
              }
            />
          </div>

          <div className="space-y-4">
            {invoice.items.map((item, index) => (
              <div key={index} className="grid grid-cols-5 gap-2 items-center">
                <Input
                  placeholder="Description"
                  value={item.description}
                  onChange={e =>
                    handleItemChange(index, 'description', e.target.value)
                  }
                  className="col-span-2"
                />
                <Input
                  type="number"
                  placeholder="Qty"
                  value={item.quantity}
                  onChange={e =>
                    handleItemChange(
                      index,
                      'quantity',
                      parseFloat(e.target.value),
                    )
                  }
                />
                <Input
                  type="number"
                  placeholder="Rate"
                  value={item.rate}
                  onChange={e =>
                    handleItemChange(index, 'rate', parseFloat(e.target.value))
                  }
                />
                <Input
                  type="number"
                  placeholder="Tax %"
                  value={item.tax}
                  onChange={e =>
                    handleItemChange(index, 'tax', parseFloat(e.target.value))
                  }
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeItem(index)}
                >
                  ❌
                </Button>
              </div>
            ))}
            <Button onClick={addItem} variant="outline" size="sm">
              + Add Item
            </Button>
          </div>

          <Textarea
            placeholder="Additional notes (e.g. payment terms, bank details)"
            value={invoice.notes}
            onChange={e => setInvoice({ ...invoice, notes: e.target.value })}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Invoice Preview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <p className="font-semibold">Invoice #: {invoice.invoiceNumber}</p>
          <p>Date: {invoice.invoiceDate}</p>
          <p>Due: {invoice.dueDate}</p>
          <hr />
          <p>
            From: {invoice.yourName} ({invoice.yourEmail})
          </p>
          <p>
            To: {invoice.clientName} ({invoice.clientEmail})
          </p>
          <hr />
          <ul className="space-y-1">
            {invoice.items.map((item, i) => (
              <li key={i} className="flex justify-between">
                <span>{item.description}</span>
                <span>
                  {item.quantity} × ₹{item.rate} + {item.tax}%
                </span>
              </li>
            ))}
          </ul>
          <hr />
          <p>Subtotal: ₹{subtotal.toFixed(2)}</p>
          <p>Tax: ₹{totalTax.toFixed(2)}</p>
          <p className="font-bold text-lg">Total: ₹{total.toFixed(2)}</p>
          <hr />
          {invoice.notes && (
            <div className="bg-muted/50 p-2 rounded text-muted-foreground">
              Notes: {invoice.notes}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
