import { socialCard } from "@/lib/brand";

export const dynamic = "force-static";

export function GET() {
  return socialCard();
}
