-- CreateTable
CREATE TABLE "Carrera" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "ganadorId" INTEGER NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "circuitoId" INTEGER NOT NULL,

    CONSTRAINT "Carrera_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Piloto" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "escuderiaId" INTEGER NOT NULL,
    "numero" INTEGER NOT NULL,
    "nacionalidad" TEXT NOT NULL,

    CONSTRAINT "Piloto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Escuderia" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Escuderia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Circuito" (
    "id" SERIAL NOT NULL,
    "tipo" TEXT NOT NULL,
    "cantidad_curvas" INTEGER NOT NULL,
    "Longitud" DOUBLE PRECISION NOT NULL,
    "Region" TEXT NOT NULL,

    CONSTRAINT "Circuito_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Calendario" (
    "id" SERIAL NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "carreraId" INTEGER NOT NULL,
    "participanteId" INTEGER NOT NULL,

    CONSTRAINT "Calendario_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Carrera" ADD CONSTRAINT "Carrera_ganadorId_fkey" FOREIGN KEY ("ganadorId") REFERENCES "Piloto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Carrera" ADD CONSTRAINT "Carrera_circuitoId_fkey" FOREIGN KEY ("circuitoId") REFERENCES "Circuito"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Calendario" ADD CONSTRAINT "Calendario_carreraId_fkey" FOREIGN KEY ("carreraId") REFERENCES "Carrera"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Calendario" ADD CONSTRAINT "Calendario_participanteId_fkey" FOREIGN KEY ("participanteId") REFERENCES "Piloto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
