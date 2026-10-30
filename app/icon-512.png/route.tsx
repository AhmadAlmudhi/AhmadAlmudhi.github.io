import { monogram } from "@/lib/brand";

export const dynamic = "force-static";

export function GET() {
  return monogram(512);
}
