const customers = [
    {
      id: 1,
      name: 'Customer 1',
      invoices: [
        {
          id: 1,
          date: '2022-01-01',
          products: [
            { name: 'Product 1', quantity: 2, price: 10, taxRate: 0.1 },
            { name: 'Product 2', quantity: 1, price: 20, taxRate: 0.2 },
          ],
        },
        // more invoices...
      ],
    },
    // more customers...
  ];
  