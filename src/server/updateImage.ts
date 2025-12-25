"use server";

import prisma from "@/lib/database/dbClient";
import { rm } from "fs/promises";
import { nanoid } from "nanoid";
import sharp from "sharp";

const updateImage = async (
	prevImgInfo: string,
	nextImgInfo: File,
	info: string,
) => {
	try {
		const imgBuffer = await nextImgInfo.arrayBuffer();
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

		await rm(`./public/studentsimage/${prevImgInfo}`);

		await prisma.student.update({
			where: {
				id: info,
			},
			data: {
				stuImage: imgId,
			},
		});

		return {
			isSuccess: true,
			message: "Student Image  Updated successfully. ",
		};
	} catch (error) {
		console.error(error);
		return {
			isSuccess: false,
			message: "Student Image Updation  failed! Please try again.",
		};
	}
};

export default updateImage;
