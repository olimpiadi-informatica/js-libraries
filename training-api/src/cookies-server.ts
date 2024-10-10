import { cookies } from "next/headers";

export function getCookies(): string {
  const token = cookies().get("training_token");
  return token ? `training_token=${token.value}` : "";
}
