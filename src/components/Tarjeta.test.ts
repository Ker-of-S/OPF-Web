import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { describe, it, expect } from "vitest";
import * as cheerio from "cheerio";
import Tarjeta from "./Tarjeta.astro";

describe("Componente Tarjeta.astro", () => {
  it("renderiza una tarjeta normal sin título", async () => {
    const container = await AstroContainer.create();

    const result = await container.renderToString(Tarjeta, {
      props: { class: "tarjeta-estandar" },
      slots: { default: "<p>Contenido base de la tarjeta</p>" },
    });

    const $ = cheerio.load(result);

    const contenedorDiv = $("div").first();

    expect($("h3").length).toBe(0);

    expect(contenedorDiv.hasClass("resaltada")).toBe(false);

    expect(contenedorDiv.hasClass("tarjeta-estandar")).toBe(true);
  });

  it("renderiza una tarjeta resaltada con su <h3> cuando se le pasa el título", async () => {
    const container = await AstroContainer.create();

    const result = await container.renderToString(Tarjeta, {
      props: { titulo: "Aviso Importante", class: "tarjeta-alerta" },
      slots: { default: "Este es un aviso para los alumnos." },
    });

    const $ = cheerio.load(result);

    const contenedorDiv = $("div").first();
    const etiquetaTitulo = $("h3");

    expect(etiquetaTitulo.length).toBe(1);

    expect(etiquetaTitulo.text().trim()).toBe("Aviso Importante");

    expect(contenedorDiv.hasClass("resaltada")).toBe(true);
  });
});
