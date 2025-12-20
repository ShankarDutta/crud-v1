import CardSkeleton from "@/components/CardSkeleton";

const loading = () => {
	return (
		<section>
			<section className="grid h-dvh grid-cols-1 place-items-center gap-10 pt-24 md:grid-cols-2 md:pt-14">
				<CardSkeleton />
				<CardSkeleton />
				<CardSkeleton />
				<CardSkeleton />
			</section>
		</section>
	);
};

export default loading;
