"use server";

import prisma from "@/lib/database/dbClient";
import { StudentSchemaType } from "@/lib/schema";
import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";
import sharp from "sharp";

const createStudent = async (
	{ firstName, lastName, emailId, gender, teacherId }: StudentSchemaType,
	imgFile: File,
) => {
	try {
		if (!imgFile) {
			return {
				isSucess: false,
				message: "Please upload student image",
			};
		}
		const imgBuffer = await imgFile.arrayBuffer();
		const imgId = `${nanoid(8)}.jpeg`;
		await sharp(imgBuffer)
			.resize({
				height: 400,
				width: 400,
			})
			.jpeg({
				mozjpeg: true,
				quality: 90,
			})
			.toFile(`./public/studentsimage/${imgId}`);

		await prisma.student.create({
			data: {
				firstName,
				lastName,
				emailId,
				gender,
				teacherId,
				stuImage: imgId,
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
			message: "Unable to create student! please try again",
		};
	}
};

export default createStudent;
