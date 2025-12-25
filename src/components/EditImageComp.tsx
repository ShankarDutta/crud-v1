import updateImage from "@/server/updateImage";
import { LoaderIcon, UploadIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";
import { useFilePicker } from "use-file-picker";
import { Button } from "./shadcnui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./shadcnui/tooltip";

type EditImageCompProps = {
	prevImgInfo: string;
	info: string;
};

const EditImageComp = ({ prevImgInfo, info }: EditImageCompProps) => {
	const [isLoading, setIsLoading] = useState(false);
	const [isFile, setFile] = useState(false);
	const { openFilePicker, filesContent, plainFiles, clear } = useFilePicker({
		multiple: false,
		accept: "image/*",
		readAs: "DataURL",
		onFilesSuccessfullySelected: () => setFile(true),
		onClear: () => {
			setFile(false);
		},
	});

	const uImage = async () => {
		setIsLoading(true);
		await new Promise<void>((r) => setTimeout(r, 1800));
		const { isSuccess, message } = await updateImage(
			prevImgInfo,
			plainFiles[0],
			info,
		);

		if (isSuccess) {
			toast.success(message);
		} else {
			toast.error(message);
		}

		setIsLoading(false);
	};

	return (
		<section className="flex flex-col items-center gap-4 space-y-2 md:flex-row">
			{!isFile && (
				<Tooltip>
					<TooltipTrigger asChild>
						<Image
							src={`/studentsimage/${prevImgInfo}`}
							alt="name"
							height={450}
							width={450}
							onClick={openFilePicker}
							loading="eager"
							className="h-34 w-34 cursor-pointer rounded-full object-contain"
						/>
					</TooltipTrigger>

					<TooltipContent
						side="left"
						sideOffset={-26}>
						<p>Change picture</p>
					</TooltipContent>
				</Tooltip>
			)}

			{filesContent.map((file, index) => (
				<Tooltip key={index}>
					<TooltipTrigger>
						<Image
							src={file.content}
							alt={file.name}
							height={450}
							width={450}
							onClick={openFilePicker}
							loading="eager"
							className="h-34 w-34 cursor-pointer rounded-full object-cover"
						/>
					</TooltipTrigger>

					<TooltipContent
						side="left"
						sideOffset={-26}>
						<p>Add new picture</p>
					</TooltipContent>
				</Tooltip>
			))}
			<div className="space-y-2 text-center md:text-start">
				<p className="w-65 items-center text-black/70 dark:text-white/70">
					Kindly update your picture so your profile information remains
					accurate and current.
				</p>
				<div className="space-x-3">
					<Button
						disabled={!isFile}
						variant="destructive"
						onClick={() => clear()}
						className="cursor-pointer">
						Clear
					</Button>
					<Button
						disabled={!isFile || isLoading}
						className="cursor-pointer bg-blue-400 text-white hover:bg-blue-600"
						onClick={uImage}>
						{isLoading ? (
							<>
								<LoaderIcon className="animate-spin" /> Uploading...
							</>
						) : (
							<>
								<UploadIcon />
								Upload
							</>
						)}
					</Button>
				</div>
			</div>
		</section>
	);
};

export default EditImageComp;
