"use server";

import prisma from "@/lib/database/dbClient";
import { TeacherSchemaType } from "@/lib/schema";
import { revalidatePath } from "next/cache";

const createTeacher = async ({ firstName, lastName }: TeacherSchemaType) => {
	try {
		await prisma.teacher.create({
			data: {
				firstName,
				lastName,
			},
		});

		revalidatePath("/student/create");

		return {
			isSucess: true,
			message: "Teacher profile created successfully",
		};
	} catch (error) {
		console.error(error);
		return {
			isSucess: false,
			message: "Unable to create teacher! Please try again",
		};
	}
};

export default createTeacher;
