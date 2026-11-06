import { supabase } from "../../../lib/supabase";
export default async function TestPage() {
  const { data, error } = await supabase
    .from("products")
    .select("*");

  return (
    <main className="min-h-screen bg-slate-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-4">
        Supabase Test
      </h1>

      <pre className="bg-slate-800 p-4 rounded">
        {JSON.stringify({ data, error }, null, 2)}
      </pre>
    </main>
  );
}