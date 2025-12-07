"use client";

import { teacherSchema, TeacherSchemaType } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { InfoIcon, LoaderIcon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Button } from "../shadcnui/button";
import { Field, FieldError, FieldLabel } from "../shadcnui/field";
import { Input } from "../shadcnui/input";

const TeacherForm = () => {
	const {
		handleSubmit,
		control,
		reset,
		formState: { isSubmitting },
	} = useForm({
		resolver: zodResolver(teacherSchema),
		defaultValues: {
			firstName: "",
			lastName: "",
		},
		mode: "onSubmit",
	});

	const submitTeacherData = async (fData: TeacherSchemaType) => {
		await new Promise<void>((r) => setTimeout(r, 1800));
		console.log(fData);
		toast.success("Successfully Teacher Create!");
		reset();
	};

	return (
		<form
			onSubmit={handleSubmit(submitTeacherData)}
			noValidate
			className="space-y-3">
			<Controller
				name="firstName"
				control={control}
				render={({ field, fieldState }) => (
					<Field data-invalid={fieldState.invalid}>
						<FieldLabel htmlFor={field.name}>First Name</FieldLabel>
						<Input
							{...field}
							id={field.name}
							aria-invalid={fieldState.invalid}
							placeholder="first Name"
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
						<FieldLabel
							htmlFor={field.name}
							className="">
							Last Name
						</FieldLabel>
						<Input
							{...field}
							id={field.name}
							aria-invalid={fieldState.invalid}
							placeholder="last Name"
							autoComplete="family-name"
						/>

						{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
					</Field>
				)}
			/>

			<Button
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

export default TeacherForm;
