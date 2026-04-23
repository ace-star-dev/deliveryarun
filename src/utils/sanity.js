import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: 'a2tr4jig',
  dataset: 'production',
  useCdn: true, // Use o CDN para respostas rápidas
  apiVersion: '2024-04-23', // Data de hoje para garantir a versão estável
});

const builder = imageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}
