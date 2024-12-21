-- CreateTable
CREATE TABLE "carrera" (
    "id_carrera" SERIAL NOT NULL,
    "nombre_carrera" TEXT NOT NULL,
    "pais_sede" TEXT NOT NULL,
    "anio" INTEGER NOT NULL,
    "id_primer_puesto" INTEGER NOT NULL,
    "id_circuito_asociado" INTEGER NOT NULL,

    CONSTRAINT "carrera_pkey" PRIMARY KEY ("id_carrera")
);

-- CreateTable
CREATE TABLE "circuito" (
    "id_circuito" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "longitud_total" INTEGER NOT NULL,
    "cantidad_curvas" INTEGER NOT NULL,

    CONSTRAINT "circuito_pkey" PRIMARY KEY ("id_circuito")
);

-- AddForeignKey
ALTER TABLE "carrera" ADD CONSTRAINT "carrera_id_primer_puesto_fkey" FOREIGN KEY ("id_primer_puesto") REFERENCES "piloto"("id_piloto") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carrera" ADD CONSTRAINT "carrera_id_circuito_asociado_fkey" FOREIGN KEY ("id_circuito_asociado") REFERENCES "circuito"("id_circuito") ON DELETE RESTRICT ON UPDATE CASCADE;
