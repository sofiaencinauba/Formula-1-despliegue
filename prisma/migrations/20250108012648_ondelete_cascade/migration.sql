/*
  Warnings:

  - Made the column `id_primer_puesto` on table `carrera` required. This step will fail if there are existing NULL values in that column.
  - Made the column `id_circuito_asociado` on table `carrera` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "carrera" DROP CONSTRAINT "carrera_id_circuito_asociado_fkey";

-- DropForeignKey
ALTER TABLE "carrera" DROP CONSTRAINT "carrera_id_primer_puesto_fkey";

-- AlterTable
ALTER TABLE "carrera" ALTER COLUMN "id_primer_puesto" SET NOT NULL,
ALTER COLUMN "id_circuito_asociado" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "carrera" ADD CONSTRAINT "carrera_id_primer_puesto_fkey" FOREIGN KEY ("id_primer_puesto") REFERENCES "piloto"("id_piloto") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carrera" ADD CONSTRAINT "carrera_id_circuito_asociado_fkey" FOREIGN KEY ("id_circuito_asociado") REFERENCES "circuito"("id_circuito") ON DELETE CASCADE ON UPDATE CASCADE;
