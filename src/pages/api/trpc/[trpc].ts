import { Apartment } from "@prisma/client";
import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import slugify from "slugify";
import { CreateApartmentSchema } from "../../../models/Apartment";
import { prisma } from "../../../utils/client";

export const appRouter = trpc.router().mutation("create", {
  input: CreateApartmentSchema,
  async resolve({ input }) {
    try {
      const apartment = await prisma.apartment.create({
        data: {
          slug: slugify(input.name, { lower: true }),
          name: input.name,
          rooms: input.rooms,
        },
      });
      return apartment;
    } catch (error) {
      console.error(error);
      throw new trpc.TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "An unexpected error occurred, please try again later.",
        cause: error,
      });
    }
  },
});

// export type definition of API
export type AppRouter = typeof appRouter;

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => null,
});
