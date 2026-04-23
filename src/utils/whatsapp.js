export const formatWhatsAppMessage = (cart, total, customerInfo = null) => {
  const phoneNumber = "595981816445"; // Owner's number for testing
  const currencyFormatter = new Intl.NumberFormat('es-PY', {
    style: 'currency',
    currency: 'PYG',
    maximumFractionDigits: 0
  });

  let message = "🍱 *Nuevo Pedido - Delivery*\n\n";
  
  cart.forEach(item => {
    message += `• ${item.quantity}x ${item.name} - ${currencyFormatter.format(item.price * item.quantity)}\n`;
  });

  message += `\n*Total: ${currencyFormatter.format(total)}*`;

  if (customerInfo) {
    message += `\n\n*Datos de Entrega:*\n`;
    message += `👤 Nombre: ${customerInfo.name}\n`;
    message += `📍 Dirección: ${customerInfo.address}\n`;
    if (customerInfo.locationUrl) {
      message += `🗺️ Ubicación GPS: ${customerInfo.locationUrl}\n`;
    }
    message += `📞 Teléfono: ${customerInfo.phone}\n`;
    if (customerInfo.notes) {
      message += `📝 Notas: ${customerInfo.notes}\n`;
    }
    message += `💳 Pago: ${customerInfo.paymentMethod}`;
  }

  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
};
