export default function Home() {
  const ovens = [
    {
      name: "Gozney Roccbox",
      price: "£299",
    },
    {
      name: "Gozney Arc Lite",
      price: "£549",
    },
    {
      name: "Solo Stove Pi Prime",
      price: "£219",
    },
    {
      name: "Ooni Koda 12",
      price: "£249",
    },
  ];

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
          {ovens.map((oven) => (
            <div
              key={oven.name}
              className="bg-slate-800 rounded-xl p-6 border border-slate-700"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">
                  {oven.name}
                </h2>

                <span className="text-2xl font-bold text-green-400">
                  {oven.price}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}