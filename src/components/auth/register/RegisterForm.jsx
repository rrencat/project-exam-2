import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ServerWatning from "../../shared/ServerWarning";
import ValidationMessage from "../../shared/ValidationMessage";
import { registration } from "../../../api/auth/registration";
import { useMutation } from "@tanstack/react-query";



const schema = yup
  .object({
    name: yup
      .string()
      .matches(/^[\w_]+$/, "Only alphanumeric characters and underscores are allowed")
      .required("Username is required"),
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Email is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .required("Please enter a password"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Please confirm your password"),
    avatar: yup
      .string()
      .url("Please enter a valid URL for the avatar"),
    venueManager: yup
      .boolean()
      .required("Please specify if the user is a venue manager"),
  })
  .required();

export default function RegistrationForm() {
  const [serverMessage, setServerMessage] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const registrationMutation = useMutation({
    mutationFn: (data) => registration(data),
    onSuccess: () => {
      setServerMessage("Registration successfull. You may now log in.");
      reset();
    },
  });


  async function onSubmit(data) {
    registrationMutation.mutate(data);
  }

  return (
    <div className="flex mt-4 justify-center">
      <form className="bg-gray-800 p-8 w-full" onSubmit={handleSubmit(onSubmit)}>
        <fieldset disabled={registrationMutation.isPending}>
          {serverMessage && <div>{serverMessage}</div>}
          {registrationMutation.isError && (
            <ServerWatning>{registrationMutation.error.message}</ServerWatning>
          )}
          <div className="form-control w-full max-w-md mx-auto">
            <label className="label">
              <span className="label-text">Username</span>
            </label>
            <input className="p-3" {...register("name")} />
            {errors.name && <ValidationMessage>{errors.name.message}</ValidationMessage>}
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