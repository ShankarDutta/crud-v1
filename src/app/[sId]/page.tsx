import EditForm from "@/components/Forms/EditForm";
import { Card } from "@/components/shadcnui/card";
import prisma from "@/lib/database/dbClient";

type EditPageProps = {
	params: Promise<{ sId: string }>;
};

const page = async ({ params }: EditPageProps) => {
	const { sId } = await params;

	const stuData = await prisma.student.findFirstOrThrow({
		where: {
			id: sId,
		},
		include: {
			teacher: true,
		},
		omit: {
			teacherId: true,
		},
	});

	const teacherData = await prisma.teacher.findMany();

	return (
		<div className="grid place-items-center md:h-[95dvh]">
			<Card className="mt-20 w-[300] gap-0 space-y-3 px-4">
				<h1 className="text-center text-2xl font-bold">Update Student</h1>
				<EditForm
					stuDetails={stuData}
					teacherInfo={teacherData}
				/>
			</Card>
		</div>
	);
};

export default page;
