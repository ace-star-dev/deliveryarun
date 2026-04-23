export const categories = ["Todos", "Signature", "Sushi & Sashimi", "Wok & Pasta", "Bowls & Especiales"];

export const products = [
  {
    id: 1,
    name: "Sashimi Mostaza",
    description: "Cortes premium de salmón fresco con una sutil y potente crema de mostaza artesanal. Una danza de intensidad y suavidad.",
    price: 85000,
    category: "Signature",
    image: "/sashimi_mostaza.jpg"
  },
  {
    id: 2,
    name: "Pulpo Canadiense",
    description: "Pulpo suave, arroz crujiente y salsa canadiense- ¡combinación perfecta!",
    price: 125000,
    category: "Signature",
    image: "/pulpo.jpg"
  },
  {
    id: 3,
    name: "Uramaki Bacon & Couve",
    description: "Camarón empanizado con cream cheese, bacon caramelizado y couve crispy.",
    price: 65000,
    category: "Sushi & Sashimi",
    image: "/uramaki.jpg"
  },
  {
    id: 4,
    name: "Sashimi na Manteiga",
    description: "Salmão selado na manteiga da Normandia com salsa trufada.",
    price: 95000,
    category: "Signature",
    image: "/sashimi_manteiga.jpg"
  },
  {
    id: 5,
    name: "Niguiri de Salmón",
    description: "Sencillo, fresco y delicioso- nada supera la perfección de un nigiri de salmón.",
    price: 45000,
    category: "Sushi & Sashimi",
    image: "/niguiri.jpg"
  },
  {
    id: 6,
    name: "Mignon N’ Pasta",
    description: "La combinación perfecta de cortes de mignon premium y pasta artesanal.",
    price: 90000,
    category: "Wok & Pasta",
    image: "/mignon.jpg"
  },
  {
    id: 7,
    name: "Poke II",
    description: "Fresco, colorido e cheio de sabor! Nosso poke é feito con ingredientes seleccionados.",
    price: 70000,
    category: "Bowls & Especiales",
    image: "/poke.jpg"
  },
  {
    id: 8,
    name: "Combinado Arun",
    description: "La mejor selección de nuestras piezas clásicas para compartir.",
    price: 150000,
    category: "Sushi & Sashimi",
    image: "/combinado.jpg"
  }
];

export const formatCurrency = (value) => {
  return new Intl.NumberFormat('es-PY', {
    style: 'currency',
    currency: 'PYG',
    maximumFractionDigits: 0
  }).format(value);
};
