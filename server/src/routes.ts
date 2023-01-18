import { FastifyInstance } from 'fastify';
import { prisma } from './lib/prisma';

export async function appRoutes(app: FastifyInstance) {
  app.get('/bd-test', async () => {
    const habits = await prisma.habit.findMany();
    return habits;
  })
}

