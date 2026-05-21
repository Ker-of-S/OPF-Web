import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { describe, it, expect } from "vitest";
import * as cheerio from "cheerio";
import Seccion from "./Seccion.astro";

describe("Componente Seccion.astro", () => {
  it("renderiza la estructura base, el título y el contenido", async () => {
    const container = await AstroContainer.create();

    const result = await container.renderToString(Seccion, {
      props: { titulo: "Mecánica Clásica" },
      slots: { default: "<p>Aquí van los temas de cinemática y dinámica.</p>" },
    });

    const $ = cheerio.load(result);

    const tituloElement = $("h2");
    expect(tituloElement.text().trim()).toBe("Mecánica Clásica");

    const contenidoSlot = $("p");
    expect(contenidoSlot.text().trim()).toBe(
      "Aquí van los temas de cinemática y dinámica.",
    );

    expect($("section").length).toBe(1);
    expect($("hr").length).toBe(1);

    const hrNextElement = $("hr").next().prop("tagName");
    expect(hrNextElement).toBe("DIV");
  });
});
