export const colores = {
  naranja: "#B85025",
  _rojoYt: "#B2071D",
  verde: "#2A5C35",
  azulUaslp: "#23498C",
  azul: "#1F6BED",
  dorado: "#C8960C",
  crema: "#F7F5EF",
  cremaOscuro: "#F1E7D0",
  negro: "#1A1A1A",
  gris: "#DEDAD4",
  blanco: "#FFFFFF",
  gradienteNaranja: "linear-gradient(to right, #B85025, #C8960C)",
  gradienteAzul: "linear-gradient(to right, #1F6BED, #23498C)",
} as const;

export type Color = keyof typeof colores;
