import Link from "next/link";
import { supabase } from "../../../../lib/supabase";

export const instant = false;

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: oven } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  const { data: prices } = await supabase
    .from("prices")
    .select("*")
    .eq("product_id", id)
    .order("price", { ascending: true });

  const lowestPrice = prices?.[0]?.price;
  const highestPrice = prices?.[prices.length - 1]?.price;

  return (
    <main className="min-h-screen bg-slate-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/"
          className="inline-block mb-6 text-slate-400 hover:text-white"
        >
          ← Back to tracker
        </Link>

        <h1 className="text-4xl font-bold mb-4">
          {oven?.name}
        </h1>

        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700 mb-6">
          <div className="flex gap-8">
            <div>
              <p className="text-sm text-slate-400">
                Lowest
              </p>
              <p className="text-2xl font-bold text-green-400">
                £{lowestPrice}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-400">
                Highest
              </p>
              <p className="text-2xl font-bold text-red-400">
                £{highestPrice}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {prices?.map((price) => (
            <div
              key={price.id}
              className="bg-slate-800 rounded-xl p-4 border border-slate-700 flex justify-between items-center"
            >
              <div>
                <p className="font-medium">
                  {price.retailer}
                </p>

                <p className="text-xs text-slate-400">
                  Updated:{" "}
                  {new Date(price.checked_at).toLocaleDateString(
                    "en-GB"
                  )}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-green-400 font-bold text-xl">
                  £{price.price}
                </span>

                {price.url && (
                  <a
                    href={price.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-white text-sm"
                  >
                    Visit
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}