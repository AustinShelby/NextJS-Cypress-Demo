import { defineConfig } from "cypress";
import { prisma } from "./src/utils/client";
import shell from "shell-exec";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on, config) {
      on("task", {
        "seed:apartments": async (data) => {
          await prisma.apartment.createMany({ data: data });
          return null;
        },
        reset: async () => {
          console.log(`Starting migration: ${new Date()}`);
          await shell(
            "yarn prisma migrate reset -f && yarn prisma migrate deploy"
          );
          console.log(`Finished migration: ${new Date()}`);
          return null;
        },
      });
    },
  },
});
