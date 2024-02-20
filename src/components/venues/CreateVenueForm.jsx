import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ServerWarning from "../shared/ServerWarning";
import ValidationMessage from "../shared/ValidationMessage";
import { useMutation } from "@tanstack/react-query";
import { createVenue } from "../../api/venues/createVenue"; 

const schema = yup
  .object({
    name: yup
        .string()
        .required("Name is required"),
    description: yup
        .string()
        .required("Description is required"),
    media: yup
        .string()
        .url("Please enter a valid URL for the media"),
    price: yup
        .number()
        .required("Price is required")
        .positive("Price must be positive"),
    maxGuests: yup
        .number()
        .required("Max Guests is required")
        .positive("Max Guests must be positive"),
    rating: yup
        .number()
        .positive("Rating must be positive"),
    meta: yup
        .object()
        .shape({
            wifi: yup
                .boolean(),
            parking: yup
                .boolean(),
            breakfast: yup
                .boolean(),
            pets: yup
                .boolean(),
    }),
    location: yup
        .object()
        .shape({
            address: yup
                .string(),
            city: yup
                .string(),
            zip: yup
                .string(),
            country: yup
                .string(),
            continent: yup
                .string(),
            lat: yup
                .number(),
            lng: yup
                .number(),
    }),
  })
  

export default function CreateVenueForm() {
  const createVenueMutation = useMutation({
    mutationFn: (data) => createVenue(data),
    onSuccess: () => {
      // Handle success, e.g., show success message or redirect
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
    createVenueMutation.mutate(data);
  };

  return (
    <div className="flex mt-4 justify-center">
      <form className="bg-gray-800 p-8 w-full" onSubmit={handleSubmit(onSubmit)}>
        <fieldset disabled={createVenueMutation.isPending}>
          {createVenueMutation.isError && (<ServerWarning>{createVenueMutation.error.message}</ServerWarning>)}

            <div className="form-control w-full max-w-md mx-auto">
                <label className="label">
                    <span className="label-text">Name</span>
                </label>
                <input className="p-3" {...register("name")} />
                {errors.name && <ValidationMessage>{errors.name.message}</ValidationMessage>}
            </div>

            <div className="form-control w-full max-w-md mx-auto">
                <label className="label">
                    <span className="label-text">Description</span>
                </label>
                <textarea className="p-3" {...register("description")} />
                {errors.description && (<ValidationMessage>{errors.description.message}</ValidationMessage>)}
            </div>

            <div className="form-control w-full max-w-md mx-auto">
                <label className="label">
                    <span className="label-text">Media</span>
                </label>
                <input className="p-3" {...register("media")} />
                {errors.media && <ValidationMessage>{errors.media.message}</ValidationMessage>}
            </div>

            <div className="form-control w-full max-w-md mx-auto">
                <label className="label">
                    <span className="label-text">Price</span>
                </label>
                <input className="p-3" {...register("price")} type="number" />
                {errors.price && <ValidationMessage>{errors.price.message}</ValidationMessage>}
            </div>

            <div className="form-control w-full max-w-md mx-auto">
                <label className="label">
                    <span className="label-text">Max Guests</span>
                </label>
                <input className="p-3" {...register("maxGuests")} type="number" />
                {errors.maxGuests && <ValidationMessage>{errors.maxGuests.message}</ValidationMessage>}
            </div>

            <div className="form-control w-full max-w-md mx-auto">
                <label className="label">
                    <span className="label-text">Rating</span>
                </label>
                <input className="p-3" {...register("rating")} type="number" />
                {errors.rating && <ValidationMessage>{errors.rating.message}</ValidationMessage>}
            </div>

            <div className="form-control w-full max-w-md mx-auto">
                <label className="label">
                    <span className="label-text">WiFi</span>
                </label>
                <input className="p-3" {...register("meta.wifi")} type="checkbox" />
                {errors.meta && errors.meta.wifi && (<ValidationMessage>{errors.meta.wifi.message}</ValidationMessage>)}
            </div>

            <div className="form-control w-full max-w-md mx-auto">
                <label className="label">
                    <span className="label-text">Parking</span>
                </label>
                <input className="p-3" {...register("meta.parking")} type="checkbox" />
                {errors.meta && errors.meta.parking && (<ValidationMessage>{errors.meta.parking.message}</ValidationMessage>)}
            </div>

            <div className="form-control w-full max-w-md mx-auto">
                <label className="label">
                    <span className="label-text">Breakfast</span>
                </label>
                <input className="p-3" {...register("meta.breakfast")} type="checkbox" />
                {errors.meta && errors.meta.breakfast && (<ValidationMessage>{errors.meta.breakfast.message}</ValidationMessage>)}
            </div>

            <div className="form-control w-full max-w-md mx-auto">
                <label className="label">
                    <span className="label-text">Pets</span>
                </label>
                <input className="p-3" {...register("meta.pets")} type="checkbox" />
                {errors.meta && errors.meta.pets && (<ValidationMessage>{errors.meta.pets.message}</ValidationMessage>)}
            </div>

            <div className="form-control w-full max-w-md mx-auto">
                <label className="label">
                    <span className="label-text">Address</span>
                </label>
                <input className="p-3" {...register("location.address")} />
                {errors.location && errors.location.address && (<ValidationMessage>{errors.location.address.message}</ValidationMessage>)}
            </div>

            <div className="form-control w-full max-w-md mx-auto">
                <label className="label">
                    <span className="label-text">City</span>
                </label>
                <input className="p-3" {...register("location.city")} />
                {errors.location && errors.location.city && (<ValidationMessage>{errors.location.city.message}</ValidationMessage>)}
            </div>

            <div className="form-control w-full max-w-md mx-auto">
                <label className="label">
                    <span className="label-text">Zip</span>
                </label>
                <input className="p-3" {...register("location.zip")} />
                {errors.location && errors.location.zip && (<ValidationMessage>{errors.location.zip.message}</ValidationMessage>)}
            </div>

            <div className="form-control w-full max-w-md mx-auto">
                <label className="label">
                    <span className="label-text">Country</span>
                </label>
                <input className="p-3" {...register("location.country")} />
                {errors.location && errors.location.country && (<ValidationMessage>{errors.location.country.message}</ValidationMessage>)}
            </div>

            <div className="form-control w-full max-w-md mx-auto">
                <label className="label">
                    <span className="label-text">Continent</span>
                </label>
                <input className="p-3" {...register("location.continent")} />
                {errors.location && errors.location.continent && (<ValidationMessage>{errors.location.continent.message}</ValidationMessage>)}
            </div>

            <div className="form-control w-full max-w-md mx-auto">
                <label className="label">
                    <span className="label-text">Latitude</span>
                </label>
                <input className="p-3" {...register("location.lat")} type="number" />
                {errors.location && errors.location.lat && (<ValidationMessage>{errors.location.lat.message}</ValidationMessage>)}
            </div>

            <div className="form-control w-full max-w-md mx-auto">
                <label className="label">
                    <span className="label-text">Longitude</span>
                </label>
                <input className="p-3" {...register("location.lng")} type="number" />
                {errors.location && errors.location.lng && (<ValidationMessage>{errors.location.lng.message}</ValidationMessage>)}
            </div>

          
          <div className="form-control w-full max-w-md mx-auto">
            <button className="bg-secondary hover:bg-primary mt-2 text-white font-bold py-4 px-4 rounded">
              {createVenueMutation.isPending ? "Creating Venue..." : "Create Venue"}
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
}
