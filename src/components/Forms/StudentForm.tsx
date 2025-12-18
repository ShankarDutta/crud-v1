"use client";

import { studentSchema, StudentSchemaType } from "@/lib/schema";
import createStudent from "@/server/createStudent";
import { zodResolver } from "@hookform/resolvers/zod";
import { InfoIcon, LoaderIcon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Teacher } from "../../../generated/prisma/browser";
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

type StudentFormPropsType = {
	teacherInfo: Teacher[];
};

const StudentForm = ({ teacherInfo }: StudentFormPropsType) => {
	const {
		handleSubmit,
		control,
		reset,
		formState: { isSubmitting },
	} = useForm({
		resolver: zodResolver(studentSchema),
		defaultValues: {
			firstName: "",
			lastName: "",
			emailId: "",
			gender: "",
			teacherId: "",
		},

		mode: "onChange",
	});

	const submitData = async ({
		firstName,
		lastName,
		emailId,
		gender,
		teacherId,
	}: StudentSchemaType) => {
		await new Promise<void>((r) => setTimeout(r, 1800));
		const { isSucess, message } = await createStudent({
			firstName,
			lastName,
			emailId,
			gender,
			teacherId,
		});

		if (isSucess) {
			toast.success(message);
			reset();
		} else {
			toast.error(message);
		}
	};
	return (
		<form
			onSubmit={handleSubmit(submitData)}
			noValidate
			className="space-y-3">
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

							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
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

							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
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

			<Controller
				name="gender"
				control={control}
				render={({ field, fieldState }) => (
					<Field data-invalid={fieldState.invalid}>
						<FieldLabel htmlFor={field.name}>Genader </FieldLabel>

						<Select
							name={field.name}
							value={field.value}
							onValueChange={field.onChange}>
							<SelectTrigger
								id={field.name}
								aria-invalid={fieldState.invalid}
								className="min-w-[120px]">
								<SelectValue placeholder="Select your gender" />
							</SelectTrigger>

							<SelectContent>
								<SelectItem value="male">Male</SelectItem>
								<SelectItem value="female">Female</SelectItem>
								<SelectItem value="other">Other</SelectItem>
							</SelectContent>
						</Select>

						{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
					</Field>
				)}
			/>

			<Controller
				name="teacherId"
				control={control}
				render={({ field, fieldState }) => (
					<Field data-invalid={fieldState.invalid}>
						<FieldLabel htmlFor={field.name}>Teacher </FieldLabel>

						<Select
							name={field.name}
							value={field.value}
							onValueChange={field.onChange}>
							<SelectTrigger
								id={field.name}
								aria-invalid={fieldState.invalid}
								className="min-w-[120px]">
								<SelectValue placeholder="Select your teacher" />
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

						{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
					</Field>
				)}
			/>

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
	);
};

export default StudentForm;
