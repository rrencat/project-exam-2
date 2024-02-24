import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import ServerWarning from "../shared/ServerWarning"
import ValidationMessage from '../shared/ValidationMessage';
import { useUserActions } from "../../stores/useUserStore";
import { useMutation } from '@tanstack/react-query';
import { changeAvatar } from "../../api/profiles/changeAvatar";

const schema = yup.object({
  avatar: yup
      .string()
      .url("Please enter a valid URL for the avatar"),
});

function ChangeAvatarForm() {
  const { setUser } = useUserActions();
  const navigate = useNavigate();

  const updateProfileMutation = useMutation({
    mutationFn: (data) => changeAvatar(data), // You need to replace this with your actual API function for updating the user profile
    onSuccess: (data) => {
      setUser(data);
      // You may want to navigate the user to a different page after updating their profile
      // navigate("/customer");
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    updateProfileMutation.mutate(data);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setValue('avatar', file);
    }
  };

  return (
    <div className="flex mt-4 justify-center">
      <form className="bg-gray-800 p-8 w-full" onSubmit={handleSubmit(onSubmit)}>
        <fieldset disabled={updateProfileMutation.isPending}>
          {updateProfileMutation.isError && (
            <ServerWarning>{updateProfileMutation.error.message}</ServerWarning>
          )}
          
          
          <div className="form-control w-full max-w-md mx-auto">
            <label className="label">
              <span className="label-text">Avatar URL</span>
            </label>
            <input className="p-3" {...register("avatar")} />
            {errors.avatar && <ValidationMessage>{errors.avatar.message}</ValidationMessage>}
          </div>
          <div className="form-control w-full max-w-md mx-auto">
            <button className="bg-secondary hover:bg-primary mt-2 text-white font-bold py-4 px-4 rounded">
              {updateProfileMutation.isPending ? 'Updating...' : 'Update Profile'}
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
}

export default ChangeAvatarForm;
