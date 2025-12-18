import StudentForm from "@/components/Forms/StudentForm";
import { Card } from "@/components/shadcnui/card";
import prisma from "@/lib/database/dbClient";

const page = async () => {
	const TeacherData = await prisma.teacher.findMany();
	return (
		<div className="grid h-[95dvh] place-items-center">
			<Card className="w-[300] gap-0 space-y-3 px-4">
				<h1 className="text-center text-2xl font-bold">Create Student</h1>
				<StudentForm teacherInfo={TeacherData} />
			</Card>
		</div>
	);
};

export default page;
