"use client";

import { studentSchema, StudentSchemaType } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { InfoIcon, LoaderIcon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { Prisma, Teacher } from "../../../generated/prisma/client";
import { Button } from "../shadcnui/button";
import { Field, FieldError, FieldLabel } from "../shadcnui/field";
import { Input } from "../shadcnui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../shadcnui/select";

type EditFormType = {
	stuDetails: Prisma.StudentGetPayload<{
		include: {
			teacher: true;
		};
		omit: {
			teacherId: true;
		};
	}>;

	teacherInfo: Teacher[];
};

const EditForm = ({ stuDetails, teacherInfo }: EditFormType) => {
	const {
		handleSubmit,
		control,
		formState: { isSubmitting },
	} = useForm({
		resolver: zodResolver(studentSchema),
		defaultValues: {
			firstName: stuDetails.firstName,
			lastName: stuDetails.lastName,
			emailId: stuDetails.emailId,
			gender: stuDetails.gender,
			teacherId: stuDetails.teacher.id,
		},

		mode: "onChange",
	});

	const updateData = (uData: StudentSchemaType) => {
		console.log(uData);
	};

	return (
		<>
			<form
				onSubmit={handleSubmit(updateData)}
				noValidate
				className="mt-2 space-y-3">
				<div className="flex items-center gap-3">
					<Controller
						name="firstName"
						control={control}
						render={({ field, fieldState }) => (
							<Field data-invalid={fieldState.invalid}>
								<FieldLabel htmlFor={field.name}>First Name</FieldLabel>
								<Input
									{...field}
									id={field.name}
									type="text"
									aria-invalid={fieldState.invalid}
									placeholder="first name"
									autoComplete="given-name"
								/>

								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
					/>
					<Controller
						name="lastName"
						control={control}
						render={({ field, fieldState }) => (
							<Field data-invalid={fieldState.invalid}>
								<FieldLabel htmlFor={field.name}>Last Name </FieldLabel>
								<Input
									{...field}
									id={field.name}
									type="text"
									aria-invalid={fieldState.invalid}
									placeholder="last name"
									autoComplete="family-name"
								/>

								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
					/>
				</div>

				<Controller
					name="emailId"
					control={control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel htmlFor={field.name}>Email Id </FieldLabel>
							<Input
								{...field}
								id={field.name}
								type="email"
								aria-invalid={fieldState.invalid}
								placeholder="Enter your email id"
								autoComplete="email"
							/>

							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>
				<div className="grid grid-cols-2 gap-2">
					<Controller
						name="gender"
						control={control}
						render={({ field, fieldState }) => (
							<Field data-invalid={fieldState.invalid}>
								<FieldLabel htmlFor={field.name}>Gender</FieldLabel>

								<Select
									name={field.name}
									value={field.value}
									onValueChange={field.onChange}>
									<SelectTrigger
										id={field.name}
										aria-invalid={fieldState.invalid}
										className="min-w-30">
										<SelectValue placeholder="Your gender" />
									</SelectTrigger>

									<SelectContent>
										<SelectItem value="male">Male</SelectItem>
										<SelectItem value="female">Female</SelectItem>
										<SelectItem value="other">Other</SelectItem>
									</SelectContent>
								</Select>

								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
					/>

					<Controller
						name="teacherId"
						control={control}
						render={({ field, fieldState }) => (
							<Field data-invalid={fieldState.invalid}>
								<FieldLabel htmlFor={field.name}>Teacher</FieldLabel>

								<Select
									name={field.name}
									value={field.value}
									onValueChange={field.onChange}>
									<SelectTrigger
										id={field.name}
										aria-invalid={fieldState.invalid}
										className="min-w-30">
										<SelectValue placeholder="Your teacher" />
									</SelectTrigger>

									<SelectContent>
										{teacherInfo.map((teacher) => (
											<SelectItem
												value={teacher.id}
												key={teacher.id}>
												{teacher.firstName} {teacher.lastName}
											</SelectItem>
										))}
									</SelectContent>
								</Select>

								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
					/>
				</div>
				<Button
					type="submit"
					disabled={isSubmitting}
					className="w-full cursor-pointer">
					{isSubmitting ? (
						<>
							<LoaderIcon className="animate-spin" /> Submitting...
						</>
					) : (
						<>
							<InfoIcon /> Submit
						</>
					)}
				</Button>
			</form>
		</>
	);
};

export default EditForm;
