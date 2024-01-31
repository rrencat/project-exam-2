import { Button } from "react-daisyui";
import { useNavigate } from "react-router-dom";
import { useUserActions } from "../../../stores/useUserStore";


function LogoutButton() {
	const { clearUser } = useUserActions();

	const navigate = useNavigate();

	function handleLogout() {
		clearUser();
		navigate("/");
	}

	return (
		<Button tag="a" onClick={handleLogout} className="bt bg-secondary hover:bg-primary min-h-1 text-white font-bold py-3 px-3 rounded">
			Logout
		</Button>
	);
}

export default LogoutButton;