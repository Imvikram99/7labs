import InvoiceData from './components/InvoiceData';
import InvoicePDF from './components/InvoicePDF';
import customers from './data/customers';

export default function Home() {
  console.log('customers:', customers);

  // For this example, we'll use the first customer and the first invoice
  const customer = customers[0];
  console.log('customer:', customer);
  const invoice = customer.invoices[0];

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      //<InvoiceData invoice={{ customer, ...invoice }} />
      // <InvoicePDF invoice={{ customer, ...invoice }} />
    </main>
  );
}
