import z from "zod";

export const teacherSchema = z.object({
	firstName: z.string().min(2, { error: "Invaid First Name" }),
	lastName: z.string().min(2, { error: "Invaild Last Name" }),
});

export type TeacherSchemaType = z.infer<typeof teacherSchema>;
