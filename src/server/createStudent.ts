"use server";

import prisma from "@/lib/database/dbClient";
import { StudentSchemaType } from "@/lib/schema";
import { revalidatePath } from "next/cache";

const createStudent = async ({
	firstName,
	lastName,
	emailId,
	gender,
	teacherId,
}: StudentSchemaType) => {
	try {
		await prisma.student.create({
			data: {
				firstName,
				lastName,
				emailId,
				gender,
				teacherId,
			},
		});

		revalidatePath("/");

		return {
			isSucess: true,
			message: "Student profile created successfully",
		};
	} catch (error) {
		console.error(error);
		return {
			isSucess: false,
			message: "Unable to create student! Please try again",
		};
	}
};

export default createStudent;
