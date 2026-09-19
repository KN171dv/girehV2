import type { SVGProps } from "react";

// Ícones de marca desenhados à mão (lucide não inclui logos de marca).
// Um único peso de traço/preenchimento, consistente com o resto do sistema.

export function WhatsAppIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.04 2c-5.523 0-10 4.477-10 10 0 1.766.463 3.492 1.343 5.012L2 22l5.117-1.342A9.96 9.96 0 0 0 12.04 22c5.523 0 10-4.477 10-10s-4.477-10-10-10zm0 18.15a8.13 8.13 0 0 1-4.148-1.13l-.298-.177-3.037.797.81-2.96-.194-.304a8.13 8.13 0 0 1-1.243-4.325c0-4.494 3.656-8.15 8.15-8.15 4.493 0 8.15 3.656 8.15 8.15 0 4.493-3.657 8.15-8.15 8.15z"
      />
    </svg>
  );
}

export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.2" cy="6.8" r="1.05" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function StarIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 2.5l2.94 6.13 6.56.79-4.86 4.62 1.28 6.6L12 17.6l-5.92 3.04 1.28-6.6-4.86-4.62 6.56-.79z" />
    </svg>
  );
}
