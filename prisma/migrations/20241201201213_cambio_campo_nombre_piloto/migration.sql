/*
  Warnings:

  - You are about to drop the column `participanteId` on the `Calendario` table. All the data in the column will be lost.
  - You are about to drop the column `ganadorId` on the `Carrera` table. All the data in the column will be lost.
  - You are about to drop the column `escuderiaId` on the `Piloto` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Piloto` table. All the data in the column will be lost.
  - Added the required column `nombre` to the `Piloto` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Calendario" DROP CONSTRAINT "Calendario_participanteId_fkey";

-- DropForeignKey
ALTER TABLE "Carrera" DROP CONSTRAINT "Carrera_ganadorId_fkey";

-- AlterTable
ALTER TABLE "Calendario" DROP COLUMN "participanteId";

-- AlterTable
ALTER TABLE "Carrera" DROP COLUMN "ganadorId";

-- AlterTable
ALTER TABLE "Piloto" DROP COLUMN "escuderiaId",
DROP COLUMN "name",
ADD COLUMN     "nombre" TEXT NOT NULL;
