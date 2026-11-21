import { contact } from '../config/site'

/** يبني رابط واتساب مع رسالة جاهزة */
export function waLink(message = 'السلام عليكم، أرغب في الاستفسار عن منتجاتكم.') {
  const text = encodeURIComponent(message)
  return contact.whatsappNumber
    ? `https://wa.me/${contact.whatsappNumber}?text=${text}`
    : `https://wa.me/?text=${text}`
}

export const productMessage = (name) => `السلام عليكم، أرغب في الاستفسار عن: ${name}`
