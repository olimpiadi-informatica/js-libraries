import { cookies } from "next/headers";

export function getCookies() {
  const token = cookies().get("training_token");
  return token ? `training_token=${token.value}` : "";
}
