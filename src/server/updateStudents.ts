"use server";

import prisma from "@/lib/database/dbClient";
import { StudentSchemaType } from "@/lib/schema";

const updateStudents = async (uData: StudentSchemaType, id: string) => {
	try {
		await prisma.student.update({
			where: {
				id: id,
			},

			data: {
				firstName: uData.firstName,
				lastName: uData.lastName,
				emailId: uData.emailId,
				gender: uData.gender,
				teacherId: uData.teacherId,
			},
		});

		return {
			isSuccess: true,
			message: "Student  Updated successfully. ",
		};
	} catch (error) {
		console.error(error);

		return {
			isSuccess: false,
			message: "Student Updation process failed! Please try again.",
		};
	}
};

export default updateStudents;
