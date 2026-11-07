import { NextResponse } from "next/server";
import { supabase } from "../../../../lib/supabase";

export async function GET() {
  const { data, error } = await supabase
    .from("prices")
    .select("*");

  return NextResponse.json({
    success: !error,
    prices: data,
    error,
  });
}