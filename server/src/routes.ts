import { FastifyInstance } from 'fastify';
import dayjs from 'dayjs';
import { z } from 'zod';
import { prisma } from './lib/prisma';

export async function appRoutes(app: FastifyInstance) {
  app.post('/habits', async (request) => {
    // validação do body
    const creatHabitBody = z.object({
      title: z.string(),
      weekDays: z.array(z.number().min(0).max(6)),
    });

    const { title, weekDays} = creatHabitBody.parse(request.body);

    const today = dayjs().startOf('day').toDate();

    await prisma.habit.create({
      data: {
        title,
        created_at: today,
        weekDays: {
          create: weekDays.map((weekDay) => {
            return {
              week_day: weekDay,
            }
          })
        }
      }
    });
  });

  app.get('/day', async (request) => {
    const getDayParams = z.object({
      date: z.coerce.date() // transforma uma string em data
    });

    const { date } = getDayParams.parse(request.query);

    const parseDate = dayjs(date).startOf('day');
    const weekDay = parseDate.get('day');

    const possibleHabits = await prisma.habit.findMany({
      where: {
        created_at: {
          lte: date,
        },
        weekDays: {
          some: {
            week_day: weekDay,
          }
        }
      }
    });

    const day = await prisma.day.findUnique({
      where: {
        date: parseDate.toDate(),
      },
      include: {
        dayHabits: true,
      }
    });

    const completedHabits = day?.dayHabits.map((dayHabit) => dayHabit.id);

    return {
      possibleHabits,
      completedHabits
    };
  });

  app.patch('/habits/:id/toggle', async (request) => {
    // valida o id como string e uuid
    const toggleHabitsParams = z.object({
      id: z.string().uuid(),
    });

    const { id } = toggleHabitsParams.parse(request.params); // pega o id do params da URL

    const today = dayjs().startOf('day').toDate(); // pega o dia atual

    // procura na tabela day o dia atual
    let day = await prisma.day.findUnique({
      where: {
        date: today,
      }
    });

    // se o dia atual não existir na tabela day, criamos o dia
    if (!day) {
      day = await prisma.day.create({
        data: {
          date: today,
        }
      });
    }

    // procura o registro na tabela dayHabit
    const dayHabit = await prisma.dayHabit.findUnique({
      where: {
        day_id_habit_id: {
          day_id: day.id,
          habit_id: id,
        },
      },
    });

    // verifica se esse registro existe
    if (dayHabit) {
      // deleta o registro da tabela dayHabit
      await prisma.dayHabit.delete({
        where: {
          id: dayHabit.id,
        },
      });
    } else { 
      // adiciona o id na tabela dayHabit, isto é, completa o hábito
      await prisma.dayHabit.create({
        data: {
          day_id: day.id,
          habit_id: id,
        }
      });
    }
  });
}

