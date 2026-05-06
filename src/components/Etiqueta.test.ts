import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { describe, it, expect } from "vitest";
import * as cheerio from "cheerio";
import Etiqueta from "./Etiqueta.astro";

describe("Componente Etiqueta.astro", () => {
  it("se renderiza como párrafo (<p>) cuando no tiene href", async () => {
    const container = await AstroContainer.create();

    const result = await container.renderToString(Etiqueta, {
      slots: { default: "Listo" },
    });

    const $ = cheerio.load(result);

    const etiquetaElement = $("p");

    expect(etiquetaElement.text().trim()).toBe("Listo");
  });

  it("se renderiza como enlace (<a>) cuando le pasamos un href", async () => {
    const container = await AstroContainer.create();

    const result = await container.renderToString(Etiqueta, {
      props: { href: "/registro" },
      slots: { default: "Ir al registro" },
    });

    const $ = cheerio.load(result);

    const enlaceElement = $("a");

    expect(enlaceElement.text().trim()).toBe("Ir al registro");
    expect(enlaceElement.attr("href")).toBe("/registro");
  });
});
