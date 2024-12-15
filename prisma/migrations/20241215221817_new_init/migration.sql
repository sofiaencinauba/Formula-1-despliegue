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

-- AddForeignKey
ALTER TABLE "piloto" ADD CONSTRAINT "piloto_id_escuderia_fkey" FOREIGN KEY ("id_escuderia") REFERENCES "escuderia"("id_escuderia") ON DELETE RESTRICT ON UPDATE CASCADE;
