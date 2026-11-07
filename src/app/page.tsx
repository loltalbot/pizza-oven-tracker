import { supabase } from "../../lib/supabase";

export const instant = false;

export default async function Home() {
  const { data: ovens } = await supabase
    .from("products")
    .select("*");

  const { data: prices } = await supabase
    .from("prices")
    .select("*");

  return (
    <main className="min-h-screen bg-slate-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">
          🍕 Pizza Oven Tracker
        </h1>

        <p className="text-slate-400 mb-8">
          Tracking the best UK prices
        </p>

        <div className="grid gap-4">
          {ovens?.map((oven) => {
            const priceRecord = prices?.find(
              (p) => p.product_id === oven.id
            );

            return (
              <div
                key={oven.id}
                className="bg-slate-800 rounded-xl p-6 border border-slate-700"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-semibold">
                      {oven.name}
                    </h2>

                    {priceRecord && (
                      <p className="text-slate-400 text-sm">
                        {priceRecord.retailer}
                      </p>
                    )}
                  </div>

                  <span className="text-2xl font-bold text-green-400">
                    {priceRecord
                      ? `£${priceRecord.price}`
                      : "Coming Soon"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}