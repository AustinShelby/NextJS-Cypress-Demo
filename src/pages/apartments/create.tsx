import type { NextPage } from "next";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { trpc } from "../../utils/trpc";
import {
  CreateApartmentSchema,
  CreateApartmentSchemaType,
} from "../../models/Apartment";
import { useRouter } from "next/router";

const ApartmentsPage: NextPage = () => {
  const router = useRouter();
  const createApartment = trpc.useMutation(["create"]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateApartmentSchemaType>({
    resolver: zodResolver(CreateApartmentSchema),
  });

  const onSubmit: SubmitHandler<CreateApartmentSchemaType> = async (data) => {
    const response = await createApartment.mutateAsync(data);
    router.push(`/apartments/${response.slug}`);
  };

  return (
    <main>
      <h1>Create a New Apartment</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          <span>Name</span>
          <input type="text" {...register("name")} />
        </label>
        {errors.name && <p>{errors.name.message}</p>}

        <label>
          <span>Rooms</span>
          <input
            type="number"
            {...register("rooms", { valueAsNumber: true })}
          />
        </label>
        {errors.rooms && <p>{errors.rooms.message}</p>}
        <button type="submit">Create Apartment</button>
      </form>
    </main>
  );
};

export default ApartmentsPage;
