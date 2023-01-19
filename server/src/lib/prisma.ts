import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient({
  log: ['query'],
}); // faz a conexão com todas as tabelas do bd