import { useTheme } from "next-themes";
import { ToastContainer, Zoom } from "react-toastify";

const ToastProvider = () => {
	const { theme } = useTheme();

	return (
		<ToastContainer
			position="bottom-right"
			autoClose={2000}
			hideProgressBar={false}
			newestOnTop={false}
			closeOnClick={false}
			rtl={false}
			pauseOnFocusLoss={false}
			draggable
			pauseOnHover={false}
			theme={theme === "dark" ? "dark" : "light"}
			transition={Zoom}
		/>
	);
};

export default ToastProvider;
