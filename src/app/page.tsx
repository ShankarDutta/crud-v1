import StudentCard from "@/components/StudentCard";
import prisma from "@/lib/database/dbClient";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Next.js Starter Fullstack",
	description: "Production grade Fullstack Next.js starter template",
};

const page = async () => {
	await new Promise<void>((r) => setTimeout(r, 1200));

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
		<section className="grid h-[95dvh] grid-cols-1 place-items-center gap-5 pt-24 md:grid-cols-2 md:pt-0">
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
