import { Prisma } from "../../generated/prisma/client";
import { Card } from "./shadcnui/card";

type StudentCardProps = {
	info: Prisma.StudentGetPayload<{
		include: {
			teacher: {
				select: {
					firstName: true;
					lastName: true;
				};
			};
		};
		omit: {
			teacherId: true;
		};
	}>;
};

const StudentCard = ({ info }: StudentCardProps) => {
	console.log(info);

	return <Card></Card>;
};

export default StudentCard;
