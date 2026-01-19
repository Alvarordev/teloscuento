/**
 * Revalidate tags para invalidar cache de Next.js
 */

import { revalidateTag } from "next/cache";

export function revalidateServicios() {
  revalidateTag("servicios", "max");
}
export function revalidateDistritos() {
  revalidateTag("distritos", "max");
}
export function revalidateTelos() {
  revalidateTag("telos", "max");
}