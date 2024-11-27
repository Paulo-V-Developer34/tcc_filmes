-- CreateTable
CREATE TABLE "filme" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "image" TEXT,
    "autorname" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "autorID" TEXT NOT NULL,
    CONSTRAINT "filme_autorID_fkey" FOREIGN KEY ("autorID") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "gmail" TEXT NOT NULL,
    "image" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "filme_slug_key" ON "filme"("slug");

-- CreateIndex
CREATE INDEX "filme_slug_idx" ON "filme"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");
