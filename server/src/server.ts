import Fastify from 'fastify';
import cors from '@fastify/cors';
import { PrismaClient } from '@prisma/client';

const app = Fastify();
const prisma = new PrismaClient(); // faz a conexão com todas as tabelas do bd

app.register(cors);

app.get('/bd-test', async () => {
  const habits = await prisma.habit.findMany({
    where: {
      title: {
        startsWith: 'Beber'
      }
    }
  })
  return habits;
})

app.listen({
  port: 3333,
}).then(() => {
  console.log('HTTP server running at port 3333.')
});
