import z from "zod";

import { optionalApi } from "./common";

const bestUserSchema = z.object({
  username: z.string(),
  time: z.number(),
});

const taskStatsSchema = z.object({
  nsubs: z.number(),
  nsubscorrect: z.number(),
  nusers: z.number(),
  nuserscorrect: z.number(),
  best: bestUserSchema.array(),
});

export type BestUser = z.infer<typeof bestUserSchema>;
export type TaskStats = z.infer<typeof taskStatsSchema>;

export function getTaskStats(name: string): Promise<TaskStats | undefined> {
  return optionalApi("task", { action: "stats", name }, taskStatsSchema);
}
