"use client";

import { email, firstName, lastName, sexType } from "@/hooks/fakerGenerator";
import { studentSchema, StudentSchemaType } from "@/lib/schema";
import createStudent from "@/server/createStudent";
import { zodResolver } from "@hookform/resolvers/zod";
import { InfoIcon, LoaderIcon, SparklesIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useFilePicker } from "use-file-picker";
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
import { Tooltip, TooltipContent, TooltipTrigger } from "../shadcnui/tooltip";

type StudentFormPropsType = {
	teacherInfo: Teacher[];
};

const StudentForm = ({ teacherInfo }: StudentFormPropsType) => {
	const [isLoading, setIsLoading] = useState(false);
	const [isFile, setFile] = useState(false);
	const { push } = useRouter();
	const {
		handleSubmit,
		control,
		reset,
		setValue,
		clearErrors,
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

	const { openFilePicker, filesContent, plainFiles } = useFilePicker({
		multiple: false,
		accept: "image/*",
		readAs: "DataURL",
		onFilesSelected: () => setFile(true),
		onClear: () => setFile(false),
	});

	const submitData = async ({
		firstName,
		lastName,
		emailId,
		gender,
		teacherId,
	}: StudentSchemaType) => {
		if (!isFile || !plainFiles[0]) {
			toast.error("Please select a student image");
			return;
		}

		await new Promise<void>((r) => setTimeout(r, 1800));

		const { isSuccess, message } = await createStudent(
			{
				firstName,
				lastName,
				emailId,
				gender,
				teacherId,
			},
			plainFiles[0],
		);

		if (isSuccess) {
			toast.success(message);
			reset();
			push("/");
		} else {
			toast.error(message);
		}
	};

	const autoGenerate = async () => {
		setIsLoading(true);

		await new Promise<void>((r) => setTimeout(r, 1800));

		setValue("firstName", firstName);
		setValue("lastName", lastName);
		setValue("emailId", email.toLowerCase());
		setValue("gender", sexType);
		clearErrors();
		setIsLoading(false);
	};
	return (
		<section className="grid place-items-center">
			{!isFile && (
				<Tooltip>
					<TooltipTrigger asChild>
						<Image
							src="/d.png"
							alt="default-img"
							height={450}
							width={450}
							loading="eager"
							onClick={openFilePicker}
							className="h-auto w-37.5 cursor-pointer object-contain"
						/>
					</TooltipTrigger>
					<TooltipContent
						side="right"
						sideOffset={-26}>
						<p>Add picture</p>
					</TooltipContent>
				</Tooltip>
			)}

			{/* Selected image preview */}
			{filesContent.map((file, index) => (
				<Tooltip key={index}>
					<TooltipTrigger asChild>
						<Image
							src={file.content}
							alt={file.name}
							height={450}
							width={450}
							onClick={openFilePicker}
							className="mx-auto h-37.5 w-37.5 cursor-pointer rounded-full object-cover"
						/>
					</TooltipTrigger>
					<TooltipContent
						side="right"
						sideOffset={-26}>
						<p>Change picture</p>
					</TooltipContent>
				</Tooltip>
			))}

			<form
				onSubmit={handleSubmit(submitData)}
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

			<Button
				onClick={autoGenerate}
				disabled={isLoading}
				className="mt-3 w-full cursor-pointer border border-black bg-transparent text-black hover:bg-black/90 hover:text-white dark:border-white dark:text-white dark:hover:bg-white/90 dark:hover:text-black">
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
		</section>
	);
};

export default StudentForm;
