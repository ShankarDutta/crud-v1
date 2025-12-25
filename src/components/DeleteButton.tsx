import deleteStudent from "@/server/deleteStudent";
import { LoaderIcon, TrashIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { Button } from "./shadcnui/button";

type DeleteButtonProps = {
	studentDetails: string;
	studntImage: string;
};

const DeleteButton = ({ studntImage, studentDetails }: DeleteButtonProps) => {
	const [isPending, setPending] = useState(false);

	const deleteData = async () => {
		setPending(true);
		await new Promise<void>((r) => setTimeout(r, 1800));
		const { isSuccess, message } = await deleteStudent({
			studentDetails,
			studntImage,
		});

		if (isSuccess) {
			toast.success(message);
		} else {
			toast.error(message);
		}

		setPending(false);
	};

	return (
		<Button
			disabled={isPending}
			onClick={deleteData}
			className="w-full cursor-pointer bg-red-500 text-white hover:bg-red-600 md:w-auto">
			{isPending ? (
				<>
					<LoaderIcon className="animate-spin" /> Deleting...
				</>
			) : (
				<>
					<TrashIcon /> Delete
				</>
			)}
		</Button>
	);
};

export default DeleteButton;
