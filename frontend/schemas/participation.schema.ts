import { z } from "zod";

export const participantCreateSchema = z.object({
  hackerId: z.string().uuid(),
  programId: z.string().uuid(),
});

export type ParticipantCreateType = z.infer<typeof participantCreateSchema>;

export const participantSchema = z.object({
  id: z.string().uuid(),
  hackerId: z.string().uuid(),
  programId: z.string().uuid(),
  createdAt: z.coerce.date(),
});

export type Participant = z.infer<typeof participantSchema>;

export const submissionCreateSchema = z.object({
  programId: z.string().uuid(),
  hackerId: z.string().uuid(),
  description: z.string().min(1).max(255),
  details: z.string().min(1).max(255),
});

export type SubmissionCreateType = z.infer<typeof submissionCreateSchema>;

export const SubmissionEnumValues = [
  "pending",
  "approved",
  "rejected",
] as const;
export const SubmissionEnum = z.enum(SubmissionEnumValues);
export type SubmissionStatus = z.infer<typeof SubmissionEnum>;

export const submissionSchema = z.object({
  id: z.string().uuid(),
  status: SubmissionEnum,
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  hackerId: z.string().uuid(),
  programId: z.string().uuid(),
  updaterId: z.string().uuid().optional().nullable(),
  description: z.string(),
  details: z.string(),
  feedback: z.string().optional().nullable(),
});

export type Submission = z.infer<typeof submissionSchema>;
