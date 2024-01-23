import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import ServerWarning from "../../shared/ServerWarning";
import ValidationMessage from "../../shared/ValidationMessage";
import { useUserActions } from "../../../stores/UseUserStore";
import { useMutation } from "@tanstack/react-query";
import { register } from "../../../api/auth/register";

const schema = yup
  .object({
    username: yup
      .string()
      .matches(/^[\w_]+$/, "Only alphanumeric characters and underscores are allowed")
      .required("Username is required"),
    email: yup
      .string()
      //.matches(/^(stud\.)?noroff\.no$/, "Please enter a valid stud.noroff.no or noroff.no email address")
      .email("Please enter a valid email")
      .required("Email is required"),
    password: yup.string().min(8, "Password must be at least 8 characters").required("Please enter a password"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Please confirm your password"),
    avatar: yup.string().url("Please enter a valid URL for the avatar"),
    venueManager: yup.boolean().required("Please specify if the user is a venue manager"),
  })
  .required();

export default function RegistrationForm() {
  const { setUser } = useUserActions();
  const navigate = useNavigate();

  const registrationMutation = useMutation({
    mutationFn: (data) => register(data),
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
    registrationMutation.mutate(data);
  }

  return (
    <div className="flex mt-4 justify-center">
      <form className="bg-gray-800 p-8 w-full" onSubmit={handleSubmit(onSubmit)}>
        <fieldset disabled={registrationMutation.isPending}>
          {registrationMutation.isError && (
            <ServerWarning>{registrationMutation.error.message}</ServerWarning>
          )}
          <div className="form-control w-full max-w-md mx-auto">
            <label className="label">
              <span className="label-text">Username</span>
            </label>
            <input className="p-3" {...register("username")} />
            {errors.username && <ValidationMessage>{errors.username.message}</ValidationMessage>}
          </div>
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
            <label className="label">
              <span className="label-text">Confirm Password</span>
            </label>
            <input className="p-3" {...register("confirmPassword")} type="password" />
            {errors.confirmPassword && (
              <ValidationMessage>{errors.confirmPassword.message}</ValidationMessage>
            )}
          </div>
          <div className="form-control w-full max-w-md mx-auto">
            <label className="label">
              <span className="label-text">Avatar URL</span>
            </label>
            <input className="p-3" {...register("avatar")} />
            {errors.avatar && <ValidationMessage>{errors.avatar.message}</ValidationMessage>}
          </div>
          <div className="form-control w-full max-w-md mx-auto">
            <label className="label">
              <span className="label-text">Venue Manager</span>
            </label>
            <input className="p-3" {...register("venueManager")} type="checkbox" />
            {errors.venueManager && (
              <ValidationMessage>{errors.venueManager.message}</ValidationMessage>
            )}
          </div>
          <div className="form-control w-full max-w-md mx-auto">
            <button className="bg-secondary hover:bg-primary mt-2 text-white font-bold py-4 px-4 rounded">
              {registrationMutation.isPending ? "Registering..." : "Register"}
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
}