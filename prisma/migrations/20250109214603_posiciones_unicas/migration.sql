-- CreateTable
CREATE TABLE "piloto" (
    "id_piloto" SERIAL NOT NULL,
    "nombre_piloto" TEXT NOT NULL,
    "nacionalidad_piloto" TEXT NOT NULL,
    "edad_piloto" INTEGER NOT NULL,
    "puntos_piloto" INTEGER NOT NULL,
    "posicion_piloto" INTEGER NOT NULL,
    "id_escuderia" INTEGER NOT NULL,

    CONSTRAINT "piloto_pkey" PRIMARY KEY ("id_piloto")
);

-- CreateTable
CREATE TABLE "escuderia" (
    "id_escuderia" SERIAL NOT NULL,
    "nombre_escuderia" TEXT NOT NULL,
    "puntos_escuderia" INTEGER NOT NULL,
    "pais_escuderia" TEXT NOT NULL,
    "anio_creacion_escuderia" INTEGER NOT NULL,
    "posicion_escuderia" INTEGER NOT NULL,

    CONSTRAINT "escuderia_pkey" PRIMARY KEY ("id_escuderia")
);

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

-- CreateIndex
CREATE UNIQUE INDEX "piloto_posicion_piloto_key" ON "piloto"("posicion_piloto");

-- CreateIndex
CREATE UNIQUE INDEX "escuderia_posicion_escuderia_key" ON "escuderia"("posicion_escuderia");

-- AddForeignKey
ALTER TABLE "piloto" ADD CONSTRAINT "piloto_id_escuderia_fkey" FOREIGN KEY ("id_escuderia") REFERENCES "escuderia"("id_escuderia") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carrera" ADD CONSTRAINT "carrera_id_circuito_asociado_fkey" FOREIGN KEY ("id_circuito_asociado") REFERENCES "circuito"("id_circuito") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carrera" ADD CONSTRAINT "carrera_id_primer_puesto_fkey" FOREIGN KEY ("id_primer_puesto") REFERENCES "piloto"("id_piloto") ON DELETE CASCADE ON UPDATE CASCADE;
