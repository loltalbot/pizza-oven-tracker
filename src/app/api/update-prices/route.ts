import { NextResponse } from "next/server";
import { supabase } from "../../../../lib/supabase";
import * as cheerio from "cheerio";

async function getGozneyPrice(url: string) {
  const response = await fetch(url);
  const html = await response.text();

  const $ = cheerio.load(html);

  return $('meta[property="og:price:amount"]').attr("content");
}

async function getOoniPrice(url: string) {
  const response = await fetch(url);
  const html = await response.text();

  const match = html.match(/price:"([0-9.]+)"/);

  return match ? match[1] : null;
}

export async function GET() {
  const { data: rows } = await supabase
    .from("prices")
    .select("*");

  const results = [];

  for (const row of rows || []) {
    let price = null;

    if (row.retailer === "Gozney UK") {
      price = await getGozneyPrice(row.url);
    }

    if (row.retailer === "Ooni UK") {
      price = await getOoniPrice(row.url);
    }

    if (!price) {
      results.push({
        id: row.id,
        retailer: row.retailer,
        status: "skipped",
      });
      continue;
    }

    await supabase
      .from("prices")
      .update({
        price: parseFloat(price),
        checked_at: new Date().toISOString(),
      })
      .eq("id", row.id);

    results.push({
      id: row.id,
      retailer: row.retailer,
      price,
      updated: true,
    });
  }

  return NextResponse.json(results);
}