export type Barber = {
  id: string;
  name: string;
  photo: string;
};

/*
  Só nome e foto. As linhas de apresentação que existiam aqui descreviam o
  jeito de trabalhar de cada profissional, e isso nunca foi confirmado pela
  barbearia. Onde falta informação real, a seção respira em vez de inventar.
*/
export const BARBERS: Barber[] = [
  { id: "yuri", name: "Yuri", photo: "/img/Yuri.jpg" },
  { id: "ithalo", name: "Ithalo", photo: "/img/Ithalo.jpg" },
  { id: "yago", name: "Yago", photo: "/img/Yago.jpg" },
  { id: "carlos", name: "Carlos", photo: "/img/Carlos.jpg" },
];
