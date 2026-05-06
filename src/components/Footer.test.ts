import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { describe, it, expect } from 'vitest';
import * as cheerio from 'cheerio';
import Footer from './Footer.astro';

describe('Componente Footer.astro', () => {
  it('renderiza el texto oficial y los 3 enlaces correctos', async () => {
    const container = await AstroContainer.create();

    const result = await container.renderToString(Footer);
    const $ = cheerio.load(result);
    
    const parrafo = $('p').text().trim();
    expect(parrafo).toBe('Olimpiada Potosina de Física');

    const enlaces = $('a');
    expect(enlaces.length).toBe(3);

    const urls = enlaces.map((i, el) => $(el).attr('href')).get();
    
    expect(urls).toContain('mailto:omfslp@gmail.com');
    expect(urls).toContain('https://www.facebook.com/omfslp');
    expect(urls).toContain('https://www.youtube.com/@olimpiadadefisicaslp4634');
  });
});