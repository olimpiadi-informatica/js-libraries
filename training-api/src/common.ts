import z, { type ZodError, type ZodObject, type ZodRawShape } from "zod";
import { fromZodError } from "zod-validation-error";

import { post } from "./fetch";

export const BASE_URL =
  process.env.TRAINING_API_URL ??
  process.env.NEXT_PUBLIC_TRAINING_API_URL ??
  "https://training.olinfo.it/api";

export async function api<T, Shape extends ZodRawShape>(
  endpoint: string,
  body: object,
  schema: ZodObject<Shape, any, any, T, any>,
  setCookie?: boolean,
): Promise<T> {
  const resp = await post(`${BASE_URL}/${endpoint}`, body, setCookie);
  if (!resp.ok) {
    throw new Error(`Error ${resp.status}: ${resp.statusText}`);
  }

  const json = await resp.json();
  let data: any;
  try {
    data = z
      .discriminatedUnion("success", [
        schema.strict().extend({ success: z.literal(1) }),
        z.object({ success: z.literal(0), error: z.string() }),
      ])
      .parse(json);
  } catch (err) {
    console.error(err);
    throw fromZodError(err as ZodError);
  }

  if (data.success === 0) {
    throw new Error(data.error);
  }
  return data as T;
}

export async function optionalApi<T, Shape extends ZodRawShape>(
  endpoint: string,
  body: object,
  schema: ZodObject<Shape, any, any, T, any>,
): Promise<T | undefined> {
  try {
    return await api(endpoint, body, schema);
  } catch (err) {
    if (err instanceof Error && err.message === "Not found") {
      return undefined;
    }
    throw err;
  }
}
