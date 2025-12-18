import StudentCard from "@/components/StudentCard";
import prisma from "@/lib/database/dbClient";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Next.js Starter Fullstack",
	description: "Production grade Fullstack Next.js starter template",
};

const page = async () => {
	const allStudents = await prisma.student.findMany({
		include: {
			teacher: {
				select: {
					firstName: true,
					lastName: true,
				},
			},
		},
		omit: {
			teacherId: true,
		},
	});

	return (
		<section className="grid h-[90dvh] place-items-center">
			{allStudents.map((item) => (
				<StudentCard
					key={item.id}
					info={item}
				/>
			))}
		</section>
	);
};

export default page;
