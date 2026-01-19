import { createClient } from "@/supabase/server";
import { unstable_cache } from "next/cache";
import { Telo } from "@/types/database";


export async function getTelos() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("telos")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching telos:", error);
    throw new Error("No se pudieron cargar los telos");
  }

  return data as Telo[];
}

export const getTelosCached = unstable_cache(
  async () => {
    return await getTelos();
  },
  ["telos"],
  {
    revalidate: 60,
    tags: ["telos"],
  }
);

export async function getTeloBySlug(slug: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("telos")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Error fetching telo:", error);
    return null;
  }

  return data as Telo;
}

export async function getTelosByDistrito(distritoId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("telos")
    .select("*")
    .eq("distrito_id", distritoId)
    .order("stars", { ascending: false, nullsFirst: false });

  if (error) {
    console.error("Error fetching telos by distrito:", error);
    return [];
  }

  return data as Telo[];
}

export async function createTelo(
  telo: Omit<Telo, "id" | "created_at">
) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("telos")
    .insert(telo)
    .select()
    .single();

  if (error) {
    console.error("Error creating telo:", error);
    throw new Error("No se pudo crear el telo");
  }

  return data as Telo;
}

export async function updateTelo(
  id: string,
  updates: Partial<Omit<Telo, "id" | "created_at">>
) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("telos")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating telo:", error);
    throw new Error("No se pudo actualizar el telo");
  }

  return data as Telo;
}

export async function deleteTelo(id: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("telos")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting telo:", error);
    throw new Error("No se pudo eliminar el telo");
  }

  return true;
}
