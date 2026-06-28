export const formatWhatsAppMessage = (items) => {
  if (!items || items.length === 0) return '';

  const productLines = items
    .map((item) => `• ${item.name} - ${item.quantity} Bags`)
    .join('\n');

  const totalBags = items.reduce((sum, item) => sum + item.quantity, 0);

  const message = `Hello Lohitha Murmura! 🙏

I would like to place a bulk order:

${productLines}

Total: ${totalBags} Bags

Please share the quotation and delivery details.

Thank you!`;

  return encodeURIComponent(message);
};

export const buildWhatsAppURL = (items, phone = '919848684411') => {
  const encoded = formatWhatsAppMessage(items);
  return `https://wa.me/${phone}?text=${encoded}`;
};
