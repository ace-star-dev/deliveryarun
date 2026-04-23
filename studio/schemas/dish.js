export default {
  name: 'dish',
  title: 'Pratos (Menu)',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Nome do Prato',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Descrição',
      type: 'text',
    },
    {
      name: 'price',
      title: 'Preço (PYG)',
      type: 'number',
    },
    {
      name: 'image',
      title: 'Imagem',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'category',
      title: 'Categoria',
      type: 'reference',
      to: [{type: 'category'}],
    },
    {
      name: 'available',
      title: 'Disponível',
      type: 'boolean',
      initialValue: true,
    }
  ],
}