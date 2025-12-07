import { z } from "zod";

export const teacherSchema = z.object({
	firstName: z.string().min(2, { message: "Invalid first name" }),
	lastName: z.string().min(2, { message: "Invalid last name" }),
});

export type TeacherSchemaType = z.infer<typeof teacherSchema>;
