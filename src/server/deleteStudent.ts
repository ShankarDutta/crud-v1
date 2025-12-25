"use server";

import prisma from "@/lib/database/dbClient";
import { rm } from "fs/promises";
type deleteStudentProps = {
	studentDetails: string;
	studntImage: string;
};

const deleteStudent = async ({
	studentDetails,
	studntImage,
}: deleteStudentProps) => {
	try {
		await prisma.student.delete({
			where: {
				id: studentDetails,
			},
		});

		await rm(`./public/studentsimage/${studntImage}`);

		return {
			isSuccess: true,
			message: "Student deleted successfully.",
		};
	} catch (error) {
		console.error(error);
		return {
			isSuccess: false,
			message: "Student deletion process failed! Please try again.",
		};
	}
};

export default deleteStudent;
