import { TrashIcon } from "lucide-react";
import { Button } from "./shadcnui/button";

const DeleteButton = () => {
	return (
		<Button className="w-full cursor-pointer bg-red-500 text-white hover:bg-red-600 md:w-auto">
			<TrashIcon /> Delete
		</Button>
	);
};

export default DeleteButton;
