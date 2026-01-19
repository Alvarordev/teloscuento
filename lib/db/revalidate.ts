/**
 * Revalidate tags para invalidar cache de Next.js
 */

import { revalidateTag } from "next/cache";

export function revalidateServicios() {
  revalidateTag("servicios", "max");
}
