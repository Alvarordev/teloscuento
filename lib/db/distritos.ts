import { createClient } from "@/supabase/server";
import { unstable_cache } from "next/cache";
import { Distrito } from "@/types/database";

export async function getDistritos() {
  const supabase = await createClient();

  const { data: distritos, error: distritosError } = await supabase
    .from("distritos")
    .select("*")
    .order("nombre", { ascending: true });

  if (distritosError) {
    console.error("Error fetching distritos:", distritosError);
    throw new Error("No se pudieron cargar los distritos");
  }

  const distritosConConteo = await Promise.all(
    distritos.map(async (distrito) => {
      const { count, error: countError } = await supabase
        .from("telos")
        .select("*", { count: "exact", head: true })
        .eq("distrito_id", distrito.id);

      if (countError) {
        console.error("Error counting telos:", countError);
        return { ...distrito, telos: 0 };
      }

      return { ...distrito, telos: count || 0 };
    })
  );

  return distritosConConteo as Distrito[];
}

export const getDistritosCached = unstable_cache(
  async () => {
    return await getDistritos();
  },
  ["distritos"],
  {
    revalidate: 60,
    tags: ["distritos"],
  }
);

export async function createDistrito(
  distrito: Omit<Distrito, "id" | "created_at" | "telos">
) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("distritos")
    .insert(distrito)
    .select()
    .single();

  if (error) {
    console.error("Error creating distrito:", error);
    throw new Error("No se pudo crear el distrito");
  }

  return { ...data, telos: 0 } as Distrito;
}
