import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { describe, it, expect } from 'vitest';
import * as cheerio from 'cheerio';
import Formulas from './Formulas.astro';

describe('Componente Formulas.astro', () => {
  it('renderiza el contenedor principal y las 10 ecuaciones', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Formulas);
    const $ = cheerio.load(result);

    const contenedorBg = $('.formulas-bg');
    expect(contenedorBg.length).toBe(1);
    expect(contenedorBg.attr('aria-hidden')).toBe('true');

    const spans = $('.formula-item');
    expect(spans.length).toBe(10);

    const textosFormulas = spans.map((i, el) => $(el).text().trim()).get();

    expect(textosFormulas).toContain('E = mc²');
    expect(textosFormulas).toContain('∇ × B = μ₀J');
    expect(textosFormulas).toContain('Ĥψ = Eψ');
    expect(textosFormulas).toContain('ΔS ≥ 0');
  });
});