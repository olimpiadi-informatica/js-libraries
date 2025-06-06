import z from "zod";

import { api, optionalApi } from "./common";

const scoreSchema = z.object({
  name: z.string(),
  title: z.string(),
  score: z.number(),
});

export enum AccessLevel {
  Admin = 0,
  Monica = 1,
  Tutor = 2,
  Teacher = 3,
  Superuser = 4,
  User = 5,
  Newbie = 6,
  Guest = 7,
}

const userSchema = z.object({
  username: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  institute: z.string().nullish(),

  mail_hash: z.string(),
  join_date: z.number().transform((d) => new Date(d * 1000)),

  score: z.number(),
  scores: scoreSchema.array().optional(),
  tasks_solved: z.number(),

  access_level: z.nativeEnum(AccessLevel),
  global_access_level: z.nativeEnum(AccessLevel),
});

const rankingSchema = z.object({
  num: z.number(),
  users: userSchema.array(),
});

const meSchema = z.object({
  user: userSchema,
});

export type User = z.infer<typeof userSchema>;
export type Ranking = z.infer<typeof rankingSchema>;

export async function getMe(): Promise<User | undefined> {
  try {
    const me = await api("user", { action: "me" }, meSchema);
    return me.user;
  } catch (err) {
    if (err instanceof Error && err.message !== "Unauthorized") {
      throw err;
    }
  }
}

export function getUser(username: string): Promise<User | undefined> {
  return optionalApi("user", { action: "get", username }, userSchema);
}

export function getRanking(page: number, pageSize = 20): Promise<Ranking> {
  const first = (page - 1) * pageSize;
  const last = first + pageSize;

  return api("user", { action: "list", first, last }, rankingSchema);
}

export function userPictureUrl(user: User): string {
  return `https://gravatar.com/avatar/${user.mail_hash}?d=identicon`;
}
