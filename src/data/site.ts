// Dados reais confirmados do negócio. Não inventar nem "arredondar" nada aqui:
// qualquer alteração precisa vir de uma confirmação explícita, como as anteriores.

export const WHATSAPP_NUMBER = "5522998367510"; // (22) 99836-7510
export const WHATSAPP_DISPLAY = "(22) 99836-7510";

export function waLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const DEFAULT_WA_MESSAGE =
  "Olá! Gostaria de agendar um horário na Gireh Barber Shop.";

export const ADDRESS = {
  line1: "Alameda Campomar, 49",
  line2: "Cidade Praiana, Rio das Ostras/RJ",
  zip: "28890-281",
  full: "Alameda Campomar, 49 - Cidade Praiana, Rio das Ostras/RJ, 28890-281",
};

export const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  ADDRESS.full,
)}`;

export const MAPS_EMBED_SRC = `https://www.google.com/maps?q=${encodeURIComponent(
  ADDRESS.full,
)}&output=embed`;

export const HOURS = [
  { days: "Segunda a sábado", time: "09h às 20h" },
  { days: "Domingo", time: "Fechado" },
];

export const HOME_SERVICE_NOTE = "Também atendemos a domicílio.";

export const INSTAGRAM_HANDLE = "@girehbarber";
export const INSTAGRAM_URL = "https://www.instagram.com/girehbarber/";

export const GOOGLE_RATING = {
  score: "4,9",
  reviews: 69,
  // Sem link direto confirmado para a ficha do Google; aponta para uma busca real do nome do negócio.
  url: "https://www.google.com/search?q=Barbearia+Gireh+Rio+das+Ostras",
};

export const BUSINESS_NAME = "Gireh Barber Shop";

/** Frase de posicionamento. Usada na abertura, no fecho e nos metadados. */
export const POSITIONING = "Corte, barba e acabamento no detalhe.";
export const FOUNDED_YEAR = 2015;
