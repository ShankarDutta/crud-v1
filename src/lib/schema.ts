import { z } from "zod";

export const teacherSchema = z.object({
	firstName: z.string().min(2, "Invalid first name"),
	lastName: z.string().min(2, "Invalid last name"),
});

export const studentSchema = z.object({
	firstName: z.string().min(2, "Invalid first name"),
	lastName: z.string().min(2, "Invalid last name"),
	emailId: z.email("Invaild email id"),
	gender: z.string().min(4, "Seletct your gender"),
	teacherId: z.string().min(1, "Selct Your teacher"),
});

export type TeacherSchemaType = z.infer<typeof teacherSchema>;

export type StudentSchemaType = z.infer<typeof studentSchema>;
