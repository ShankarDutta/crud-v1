"use client";

import { teacherSchema, TeacherSchemaType } from "@/lib/schema";
import createTheacher from "@/server/createTheacher";
import { faker } from "@faker-js/faker/locale/en_IN";
import { zodResolver } from "@hookform/resolvers/zod";
import { InfoIcon, LoaderIcon, SparklesIcon } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Button } from "../shadcnui/button";
import { Field, FieldError, FieldLabel } from "../shadcnui/field";
import { Input } from "../shadcnui/input";
const TeacherForm = () => {
	const [isLoading, setIsLoading] = useState(false);
	const {
		handleSubmit,
		control,
		reset,
		setValue,
		clearErrors,
		formState: { isSubmitting },
	} = useForm({
		resolver: zodResolver(teacherSchema),
		defaultValues: {
			firstName: "",
			lastName: "",
		},
		mode: "onSubmit",
	});

	const submitTeacherData = async ({
		firstName,
		lastName,
	}: TeacherSchemaType) => {
		await new Promise<void>((r) => setTimeout(r, 1800));
		const { isSucess, message } = await createTheacher({ firstName, lastName });

		if (isSucess) {
			toast.success(message);
			reset();
		} else {
			toast.error(message);
		}
	};

	const autoGenerate = async () => {
		setIsLoading(true);
		await new Promise<void>((r) => setTimeout(r, 1800));
		setValue("firstName", faker.person.firstName());
		setValue("lastName", faker.person.lastName());
		clearErrors();
		setIsLoading(false);
	};

	return (
		<>
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

			<Button
				onClick={autoGenerate}
				disabled={isLoading}
				className="w-full cursor-pointer border border-black bg-transparent text-black hover:bg-black/90 hover:text-white dark:border-white dark:text-white dark:hover:bg-white/90 dark:hover:text-black">
				{isLoading ? (
					<>
						<LoaderIcon className="animate-spin" /> Generating...
					</>
				) : (
					<>
						<SparklesIcon /> Generate
					</>
				)}
			</Button>
		</>
	);
};

export default TeacherForm;
