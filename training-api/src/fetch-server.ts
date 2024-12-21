import { cookies } from "next/headers";
import { parse } from "set-cookie-parser";

export async function post(url: string, body: any, setCookie?: boolean) {
  const token = cookies().get("training_token");

  const resp = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: token ? `training_token=${token.value}` : "",
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  const setCookieHeader = resp.headers.get("set-cookie");
  if (setCookie && setCookieHeader) {
    const newCookies = parse(setCookieHeader);
    for (const cookie of newCookies) {
      const { name, value, sameSite, ...options } = cookie;
      cookies().set(name, value, options);
    }
  }

  return resp;
}
