import { createClient } from "@/supabase/server";
import { unstable_cache } from "next/cache";
import { Servicio } from "@/types/database";


export async function getServicios() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("servicios")
    .select("*")
    .order("nombre", { ascending: true });

  if (error) {
    console.error("Error fetching servicios:", error);
    throw new Error("No se pudieron cargar los servicios");
  }

  return data as Servicio[];
}

export const getServiciosCached = unstable_cache(
  async () => {
    return await getServicios();
  },
  ["servicios"],
  {
    revalidate: 60,
    tags: ["servicios"],
  }
);

export async function createServicio(
  servicio: Omit<Servicio, "id" | "created_at">
) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("servicios")
    .insert(servicio)
    .select()
    .single();

  if (error) {
    console.error("Error creating servicio:", error);
    throw new Error("No se pudo crear el servicio");
  }

  return data as Servicio;
}

