export default {
  name: 'siteSettings',
  title: 'Configurações do Site',
  type: 'document',
  fields: [
    {
      name: 'whatsapp',
      title: 'Número do WhatsApp (com código do país)',
      type: 'string',
    },
    {
      name: 'instagram',
      title: 'Link do Instagram',
      type: 'string',
    },
    {
      name: 'address',
      title: 'Endereço (Texto)',
      type: 'string',
    },
    {
      name: 'addressLink',
      title: 'Link do Google Maps',
      type: 'string',
    },
    {
      name: 'schedule',
      title: 'Horários (um por linha)',
      type: 'text',
    },
    {
      name: 'heroTitle',
      title: 'Título do Hero',
      type: 'string',
    },
    {
      name: 'heroSubtitle',
      title: 'Subtítulo do Hero',
      type: 'string',
    },
    {
      name: 'heroImage',
      title: 'Imagem de Fundo do Hero',
      type: 'image',
      options: { hotspot: true }
    },
    {
      name: 'menuTitle',
      title: 'Título da Seção de Menu',
      type: 'string',
    },
    {
      name: 'menuSubtitle',
      title: 'Subtítulo da Seção de Menu',
      type: 'string',
    },
    {
      name: 'footerDescription',
      title: 'Descrição no Rodapé',
      type: 'text',
    }
  ],
}