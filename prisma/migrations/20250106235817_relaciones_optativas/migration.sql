-- DropForeignKey
ALTER TABLE "carrera" DROP CONSTRAINT "carrera_id_circuito_asociado_fkey";

-- DropForeignKey
ALTER TABLE "carrera" DROP CONSTRAINT "carrera_id_primer_puesto_fkey";

-- AlterTable
ALTER TABLE "carrera" ALTER COLUMN "id_primer_puesto" DROP NOT NULL,
ALTER COLUMN "id_circuito_asociado" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "carrera" ADD CONSTRAINT "carrera_id_primer_puesto_fkey" FOREIGN KEY ("id_primer_puesto") REFERENCES "piloto"("id_piloto") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carrera" ADD CONSTRAINT "carrera_id_circuito_asociado_fkey" FOREIGN KEY ("id_circuito_asociado") REFERENCES "circuito"("id_circuito") ON DELETE SET NULL ON UPDATE CASCADE;
