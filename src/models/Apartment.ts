import { Apartment } from "@prisma/client";
import { z } from "zod";

export const CreateApartmentSchema: z.ZodSchema<
  Pick<Apartment, "name" | "rooms">
> = z.object({
  name: z.string(),
  rooms: z.number().positive(),
});

export type CreateApartmentSchemaType = z.infer<typeof CreateApartmentSchema>;
