import { z } from "zod";

export const ProgramStatusEnumValues = ["open", "closed"] as const;
export const ProgramStatusEnum = z.enum(ProgramStatusEnumValues, {
  errorMap: () => ({ message: "Program status is required" }),
});
export type ProgramStatus = z.infer<typeof ProgramStatusEnum>;

export const bountyProgramSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string(),
  rewardAmount: z.number(),
  ownerId: z.string().uuid(),
  status: ProgramStatusEnum,
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const createBountyProgramSchema = z.object({
  name: z.string().min(1, "description is required"),
  description: z.string().min(1, "description is required"),
  rewardAmount: z
    .string()
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val), { message: "Invalid number" })
    .refine((val) => val >= 100, { message: "Must be at least 100" }),
});

export type BountyProgram = z.infer<typeof bountyProgramSchema>;
export type BountyPrograms = z.infer<typeof bountyProgramSchema>[];
export type CreateBountyProgram = z.infer<typeof createBountyProgramSchema>;
