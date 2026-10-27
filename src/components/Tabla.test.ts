import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { describe, it, expect } from "vitest";
import * as cheerio from "cheerio";
import Tabla from "./Tabla.astro";

describe("Componente Tabla.astro", () => {
  it("renderiza los encabezados y las filas", async () => {
    const container = await AstroContainer.create();

    const result = await container.renderToString(Tabla, {
      props: {
        encabezados: ["t", "r"],
        filas: [
          [0, 1],
          [1, 20],
        ],
      },
    });

    const $ = cheerio.load(result);

    const encabezados = $("th")
      .map((_, th) => $(th).text())
      .get();

    expect(encabezados).toEqual(["t", "r"]);
    expect($("tbody tr")).toHaveLength(2);
    expect($("tbody tr").last().find("td").last().text()).toBe("20");
  });
});
