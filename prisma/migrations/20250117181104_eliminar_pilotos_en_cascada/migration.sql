-- DropForeignKey
ALTER TABLE "piloto" DROP CONSTRAINT "piloto_id_escuderia_fkey";

-- AddForeignKey
ALTER TABLE "piloto" ADD CONSTRAINT "piloto_id_escuderia_fkey" FOREIGN KEY ("id_escuderia") REFERENCES "escuderia"("id_escuderia") ON DELETE CASCADE ON UPDATE CASCADE;
