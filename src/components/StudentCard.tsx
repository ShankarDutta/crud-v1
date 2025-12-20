"use client";

import {
	CircleUserRoundIcon,
	MailIcon,
	MarsIcon,
	Pencil,
	TransgenderIcon,
	VenusIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PiStudent } from "react-icons/pi";
import { Prisma } from "../../generated/prisma/client";
import DeleteButton from "./DeleteButton";
import { Button } from "./shadcnui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "./shadcnui/card";
import { Separator } from "./shadcnui/separator";

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
	return (
		<Card className="w-auto shadow-md md:w-120">
			<CardHeader>
				<CardTitle className="text-xl md:text-3xl">Student Details</CardTitle>
			</CardHeader>

			<CardContent className="grid grid-cols-1 md:grid-cols-5 md:place-items-center md:gap-4">
				<div className="md:col-span-2">
					<Image
						src={`/studentsimage/${info.stuImage}`}
						height={400}
						width={400}
						loading="eager"
						className="h-50 w-full rounded-xl object-cover md:h-auto"
						alt={info.firstName}
					/>
				</div>

				<div className="col-span-3 mt-2 space-y-2 text-lg md:mt-0">
					<div className="flex items-center gap-2">
						<PiStudent size={26} /> {`${info.firstName} ${info.lastName}`}
					</div>
					<div className="flex items-center gap-1">
						<CircleUserRoundIcon />
						{`${info.teacher.firstName} ${info.teacher.lastName}`}
					</div>

					<div className="flex gap-1">
						{info.gender === "Male" ? (
							<MarsIcon />
						) : info.gender === "Female" ? (
							<VenusIcon />
						) : (
							<TransgenderIcon />
						)}

						{info.gender}
					</div>

					<div className="flex items-center gap-2">
						<MailIcon /> {info.emailId}
					</div>
				</div>
			</CardContent>

			<Separator />
			<CardFooter className="block gap-5 space-y-2 md:flex md:justify-end md:space-y-0">
				<DeleteButton />
				<Button
					asChild
					className="w-full cursor-pointer bg-blue-500 text-white hover:bg-blue-600 md:w-auto">
					<Link href={`/${info.id}`}>
						<Pencil />
						Edit
					</Link>
				</Button>
			</CardFooter>
		</Card>
	);
};

export default StudentCard;
