import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import ServerWarning from "../../shared/ServerWarning";
import ValidationMessage from "../../shared/ValidationMessage";
import { useUserActions } from "../../../stores/UseUserStore";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../../api/auth/login";

const schema = yup
	.object({
		email: yup.string().email("Please enter a valid email").required("Email is required"),
		password: yup.string().required("Please enter a password"),
	})
	.required();

export default function LoginForm() {
	const { setUser } = useUserActions();
	const navigate = useNavigate();

	const loginMutation = useMutation({
		mutationFn: (data) => login(data),
		onSuccess: (data) => {
			setUser(data);
			navigate("/customer");
		},
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	async function onSubmit(data) {
		loginMutation.mutate(data);
	}

	return (
		<div className="flex mt-4 justify-center">
			<form className="bg-gray-800 p-8 w-full" onSubmit={handleSubmit(onSubmit)}>
				<fieldset disabled={loginMutation.isPending}>
					{loginMutation.isError && <ServerWarning>{loginMutation.error.message}</ServerWarning>}
					<div className="form-control w-full max-w-md mx-auto">
						<label className="label">
							<span className="label-text">Email</span>
						</label>
						<input className="p-3" {...register("email")} />
						{errors.email && <ValidationMessage>{errors.email.message}</ValidationMessage>}
					</div>
					<div className="form-control w-full max-w-md mx-auto">
						<label className="label">
							<span className="label-text">Password</span>
						</label>
						<input className="p-3" {...register("password")} type="password" />
						{errors.password && <ValidationMessage>{errors.password.message}</ValidationMessage>}
					</div>
					<div className="form-control w-full max-w-md mx-auto">
						<button className="bg-secondary hover:bg-primary mt-2 text-white font-bold py-4 px-4 rounded">
							{loginMutation.isPending ? "Logging in..." : "Login"}
						</button>
					</div>
				</fieldset>
			</form>
		</div>
	);
}

