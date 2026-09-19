export type Service = {
  id: string;
  name: string;
  duration: string;
  price: number;
  photo: string;
};

// Preços confirmados por escrito com o cliente em 2026-09-18. Não alterar sem nova confirmação.
export const SERVICES: Service[] = [
  {
    id: "corte",
    name: "Corte Masculino",
    duration: "30 min",
    price: 35,
    photo: "/upload/corte-masculino.jpg",
  },
  {
    id: "barba",
    name: "Barba",
    duration: "20 min",
    price: 25,
    photo: "/upload/barba.jpg",
  },
  {
    id: "corte-barba",
    name: "Corte + Barba",
    duration: "50 min",
    price: 55,
    photo: "/upload/corte-barba.jpg",
  },
  {
    id: "sobrancelha",
    name: "Sobrancelha",
    duration: "15 min",
    price: 15,
    photo: "/upload/sobrancelha.jpg",
  },
  {
    id: "acabamento",
    name: "Acabamento",
    duration: "10 min",
    price: 10,
    photo: "/upload/acabamento.jpg",
  },
];

export function formatPrice(value: number): string {
  return `R$ ${value}`;
}

/** Mensagem de agendamento já nomeando o serviço escolhido. */
export function serviceMessage(service: Service): string {
  return `Olá! Gostaria de agendar ${service.name} na Gireh Barber Shop.`;
}
