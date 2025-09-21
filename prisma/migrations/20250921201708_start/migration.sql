-- AlterTable
ALTER TABLE "public"."Todo" ADD COLUMN     "position" SERIAL NOT NULL,
ADD COLUMN     "todoListId" INTEGER;

-- CreateTable
CREATE TABLE "public"."TodoList" (
    "id" SERIAL NOT NULL,
    "publicId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "name" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "TodoList_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TodoList_publicId_key" ON "public"."TodoList"("publicId");

-- CreateIndex
CREATE INDEX "TodoList_publicId_deleted_idx" ON "public"."TodoList"("publicId", "deleted");

-- AddForeignKey
ALTER TABLE "public"."TodoList" ADD CONSTRAINT "TodoList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Todo" ADD CONSTRAINT "Todo_todoListId_fkey" FOREIGN KEY ("todoListId") REFERENCES "public"."TodoList"("id") ON DELETE SET NULL ON UPDATE CASCADE;
