import { z } from "zod";

export const UserRoleEnumValues = ["hacker", "company", "admin"] as const;
export const UserRoleEnum = z.enum(UserRoleEnumValues, {
  errorMap: () => ({ message: "User role is required" }),
});
export type UserRole = z.infer<typeof UserRoleEnum>;

export const userSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  email: z.string(),
  role: UserRoleEnum,
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const userCreateSchema = z
  .object({
    email: z.string().email({ message: "Invalid email address" }),
    name: z.string().min(3).max(50),
    password: z.string().min(4).max(100),
    repeatPassword: z.string().min(4).max(100),
    role: UserRoleEnum,
  })
  .refine((data) => data.password === data.repeatPassword, {
    path: ["repeatPassword"],
    message: "Passwords don't match",
  });

export const userSaveSchema = z.object({
  email: z.string(),
  name: z.string(),
  password: z.string(),
  role: UserRoleEnum,
});

export type User = z.infer<typeof userSchema>;
export type UserCreate = z.infer<typeof userCreateSchema>;
export type UserSave = z.infer<typeof userSaveSchema>;

export const tokenSchema = z.object({
  accessToken: z.string(),
  tokenType: z.string(),
});

export const authUserResponseSchema = z.object({
  user: userSchema,
  token: tokenSchema,
});

export type AuthUserResponse = z.infer<typeof authUserResponseSchema>;
