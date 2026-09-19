export type Barber = {
  id: string;
  name: string;
  note: string;
  photo: string;
};

// Linhas de apresentação são descritivas e não afirmam fatos específicos não
// confirmados (tempo de casa, especialidade, prêmios). Ver PRODUCT.md > Evidence on Hand.
export const BARBERS: Barber[] = [
  {
    id: "yuri",
    name: "Yuri",
    note: "Atenção a cada detalhe, sem pressa, até o corte ficar exatamente como você pediu.",
    photo: "/img/Yuri.jpg",
  },
  {
    id: "ithalo",
    name: "Ithalo",
    note: "Régua e navalha com precisão, sempre no seu ritmo.",
    photo: "/img/Ithalo.jpg",
  },
  {
    id: "yago",
    name: "Yago",
    note: "Mão firme e olho afiado para cada linha do corte.",
    photo: "/img/Yago.jpg",
  },
  {
    id: "carlos",
    name: "Carlos",
    note: "Cuidado redobrado com quem senta na cadeira, do início ao acabamento.",
    photo: "/img/Carlos.jpg",
  },
];
