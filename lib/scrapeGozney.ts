import * as cheerio from "cheerio";

export async function scrapeGozneyPrice(url: string) {
  const response = await fetch(url);

  const html = await response.text();

  const $ = cheerio.load(html);

  const price = $('meta[property="og:price:amount"]').attr(
    "content"
  );

  return price || null;
}