import TeacherForm from "@/components/Forms/TeacherForm";
import { Card } from "@/components/shadcnui/card";

const page = () => {
	return (
		<div className="grid h-[95dvh] place-items-center">
			<Card className="w-[300] gap-0 space-y-3 px-4">
				<h1 className="text-center text-2xl font-bold">Create Teacher</h1>
				<TeacherForm />
			</Card>
		</div>
	);
};

export default page;
