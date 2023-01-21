import { FastifyInstance } from "fastify";
import dayjs from "dayjs";
import { z } from "zod";
import { prisma } from "./lib/prisma";

export async function appRoutes(app: FastifyInstance) {
  // cria o hábito
  app.post("/habits", async (request) => {
    // validação do body
    const creatHabitBody = z.object({
      title: z.string(),
      weekDays: z.array(z.number().min(0).max(6)),
    });

    const { title, weekDays } = creatHabitBody.parse(request.body);

    const today = dayjs().startOf("day").toDate();

    await prisma.habit.create({
      data: {
        title,
        created_at: today,
        weekDays: {
          create: weekDays.map((weekDay) => {
            return {
              week_day: weekDay,
            };
          }),
        },
      },
    });
  });

  // lista os hábitos do dia selecionado
  app.get("/day", async (request) => {
    const getDayParams = z.object({
      date: z.coerce.date(), // transforma uma string em data
    });

    const { date } = getDayParams.parse(request.query);

    const parseDate = dayjs(date).startOf("day");
    const weekDay = parseDate.get("day");

    const possibleHabits = await prisma.habit.findMany({
      where: {
        created_at: {
          lte: date,
        },
        weekDays: {
          some: {
            week_day: weekDay,
          },
        },
      },
    });

    const day = await prisma.day.findUnique({
      where: {
        date: parseDate.toDate(),
      },
      include: {
        dayHabits: true,
      },
    });

    const completedHabits = day?.dayHabits.map((dayHabit) => dayHabit.habit_id) ?? [];

    return {
      possibleHabits,
      completedHabits,
    };
  });

  // faz o toggle do hábito específico
  app.patch("/habits/:id/toggle", async (request) => {
    // valida o id como string e uuid
    const toggleHabitsParams = z.object({
      id: z.string().uuid(),
    });

    const { id } = toggleHabitsParams.parse(request.params); // pega o id do params da URL

    const today = dayjs().startOf("day").toDate(); // pega o dia atual

    // procura na tabela day o dia atual
    let day = await prisma.day.findUnique({
      where: {
        date: today,
      },
    });

    // se o dia atual não existir na tabela day, criamos o dia
    if (!day) {
      day = await prisma.day.create({
        data: {
          date: today,
        },
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
        },
      });
    }
  });

  // retorna o total de hábitos e o total de hábirtos completados, por dia
  // essa rota não funciona em outros tipos de bd, pois essa query foi escrita de forma 'crua' para SQLite
  app.get("/summary", async () => {
    const summary = await prisma.$queryRaw`
      SELECT D.id, D.date,
      (
        SELECT cast(count(*) as float)
        FROM day_habits DH
        WHERE DH.day_id = D.id
      ) as completed,
      (
        SELECT cast(count(*) as float)
        FROM habit_week_days HWD
        JOIN habits H
          ON H.id = HWD.habit_id
        WHERE
          HWD.week_day = cast(strftime('%w', D.date/1000.0, 'unixepoch') as int)
          AND H.created_at <= D.date
      ) as amount
      FROM days D;
    `;

    return summary;
  });
}
