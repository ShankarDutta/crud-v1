import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "./shadcnui/card";
import { Skeleton } from "./shadcnui/skeleton";

const CardSkeleton = () => {
	return (
		<>
			<Card className="w-auto shadow-md md:w-[420]">
				<CardHeader>
					<CardTitle className="text-xl md:text-3xl">
						<Skeleton className="h-7 w-[260px] rounded-2xl md:h-9 md:w-[390px]" />
					</CardTitle>
				</CardHeader>

				<CardContent className="grid grid-cols-1 md:grid-cols-5 md:place-items-center md:gap-4">
					<div className="md:col-span-2">
						<Skeleton className="h-[200px] w-[260px] rounded-xl md:h-[177px] md:w-[177px]" />
					</div>

					<div className="col-span-3 mt-2 space-y-2 text-lg md:mt-0">
						<div className="flex items-center gap-2">
							<Skeleton className="h-6 w-6 rounded-md" />
							<Skeleton className="h-7 w-[230px]" />
						</div>

						<div className="flex gap-1">
							<Skeleton className="h-6 w-6 rounded-md" />
							<Skeleton className="h-6 w-10 rounded-md" />
						</div>
						<div className="flex items-center gap-1">
							<Skeleton className="h-6 w-6 rounded-md" />
							<Skeleton className="h-6 w-[140px] rounded-md" />
						</div>

						<div className="flex items-center gap-2">
							<Skeleton className="h-6 w-6 rounded-md" />
							<Skeleton className="h-7 w-[230px]" />
						</div>
					</div>
				</CardContent>

				<Skeleton className="mx-auto h-1 w-[260px] md:w-[430px]" />
				<CardFooter className="block space-y-2 md:flex md:justify-end md:gap-4 md:space-y-0">
					<Skeleton className="h-9 w-full rounded-xl md:w-[90px]" />
					<Skeleton className="h-9 w-full rounded-xl md:w-[90px]" />
				</CardFooter>
			</Card>
		</>
	);
};

export default CardSkeleton;
