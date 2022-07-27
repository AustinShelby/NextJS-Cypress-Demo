-- CreateTable
CREATE TABLE "Apartment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "rooms" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Apartment_slug_key" ON "Apartment"("slug");
