export type Service = {
  id: string;
  name: string;
  /** Uma linha sobre o que o serviço cobre. Sem promessa, sem adjetivo solto. */
  note: string;
  duration: string;
  price: number;
  photo: string;
  /**
   * Texto alternativo da foto do serviço. Descreve o que a imagem mostra e
   * nomeia a barbearia — não repete "barbearia em Rio das Ostras" nos cinco,
   * porque a mesma frase idêntica em toda foto da página lê como enchimento
   * de palavra-chave para quem audita o HTML, não como descrição de imagem.
   */
  alt: string;
  /** Rótulo do botão: diz qual serviço será agendado, não só "agendar". */
  cta: string;
};

// Preços confirmados por escrito com o cliente em 2026-09-18. Não alterar sem nova confirmação.
export const SERVICES: Service[] = [
  {
    id: "corte",
    name: "Corte Masculino",
    note: "Do desenho ao acabamento, no seu estilo.",
    cta: "Agendar corte",
    duration: "30 min",
    price: 35,
    photo: "/img/corte-masculino.jpg",
    alt: "Corte de cabelo masculino na Gireh Barber Shop, barbearia em Rio das Ostras",
  },
  {
    id: "barba",
    name: "Barba",
    note: "Contorno, volume e acabamento no detalhe.",
    cta: "Agendar barba",
    duration: "20 min",
    price: 25,
    photo: "/img/barba.jpg",
    alt: "Barba alinhada e com acabamento feito na Gireh Barber Shop",
  },
  {
    id: "corte-barba",
    name: "Corte + Barba",
    note: "O conjunto completo, para sair da cadeira alinhado.",
    cta: "Agendar corte + barba",
    duration: "50 min",
    price: 55,
    photo: "/img/corte-barba.jpg",
    alt: "Corte e barba combinados, serviço da Gireh Barber Shop",
  },
  {
    id: "sobrancelha",
    name: "Sobrancelha",
    note: "Limpeza e desenho que acompanham o rosto.",
    cta: "Agendar sobrancelha",
    duration: "15 min",
    price: 15,
    photo: "/img/sobrancelha.jpg",
    alt: "Design de sobrancelha masculina feito na Gireh Barber Shop",
  },
  {
    id: "acabamento",
    name: "Acabamento",
    note: "O retoque entre um corte e outro: pezinho e contornos.",
    cta: "Agendar acabamento",
    duration: "10 min",
    price: 10,
    photo: "/img/acabamento.jpg",
    alt: "Acabamento de corte na nuca, realizado na Gireh Barber Shop",
  },
];

export function formatPrice(value: number): string {
  return `R$ ${value}`;
}

/** Mensagem de agendamento já nomeando o serviço escolhido. */
export function serviceMessage(service: Service): string {
  return `Olá! Gostaria de agendar ${service.name} na Gireh Barber Shop.`;
}
