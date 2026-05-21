import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { describe, it, expect } from "vitest";
import * as cheerio from "cheerio";
import Nav from "./Nav.astro";

describe("Componente Nav.astro", () => {
  it("renderiza todos los enlaces (logo + 4 secciones)", async () => {
    const container = await AstroContainer.create();

    const result = await container.renderToString(Nav, {
      request: new Request("http://localhost/"),
    });

    const $ = cheerio.load(result);

    const enlaces = $("a");
    expect(enlaces.length).toBe(5);

    const textosMenu = enlaces.map((i, el) => $(el).text().trim()).get();

    expect(textosMenu).toContain("Convocatoria");
    expect(textosMenu).toContain("Recursos");
    expect(textosMenu).toContain("Resultados");
    expect(textosMenu).toContain("Nosotros");
  });

  it("asigna la clase .active correctamente según la URL simulada", async () => {
    const container = await AstroContainer.create();

    const result = await container.renderToString(Nav, {
      request: new Request("http://localhost/resultados"),
    });

    const $ = cheerio.load(result);

    const enlacesActivos = $("a.active");

    expect(enlacesActivos.length).toBe(1);

    expect(enlacesActivos.text().trim()).toBe("Resultados");
  });
});
