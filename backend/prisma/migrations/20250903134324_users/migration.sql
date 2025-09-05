-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "cnpj" TEXT,
ADD COLUMN     "cpf" TEXT,
ADD COLUMN     "dt_nascimento" TIMESTAMP(3),
ADD COLUMN     "endereco" TEXT,
ADD COLUMN     "telefone" TEXT;
