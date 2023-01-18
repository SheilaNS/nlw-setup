import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function run() {
  await prisma.habit.deleteMany();
  await prisma.day.deleteMany();

  await Promise.all([
    prisma.habit.create({
      data: {
        id: '0730ffac-d039-4194-9571-01aa2aa0efbd',
        title: 'Beber 2L de água',
        created_at: new Date('2022-12-31T03:00:00.000z'),
        weekDays: {
          create: [
            { week_day: 1 },
            { week_day: 2 },
            { week_day: 3 },
          ]
        }
      }
    }),
    prisma.habit.create({
      data: {
        id: '00880d75-a933-4fef-94ab-e05744435297',
        title: 'Exercitar',
        created_at: new Date('2023-01-03T03:00:00.000z'),
        weekDays: {
          create: [
            { week_day: 3 },
            { week_day: 4 },
            { week_day: 5 },
          ]
        }
      }
    }),
    prisma.habit.create({
      data: {
        id: 'fa1a1bcf-3d87-4626-8c0d-d7fd1255ac00',
        title: 'Dormir 8h',
        created_at: new Date('2023-01-08T03:00:00.000z'),
        weekDays: {
          create: [
            { week_day: 1 },
            { week_day: 2 },
            { week_day: 3 },
            { week_day: 4 },
            { week_day: 5 },

          ]
        }
      }
    })
  ]);

  await Promise.all([
    prisma.day.create({
      data: {
        date: new Date('2023-01-02T03:00:00.000z'),
        dayHabits: {
          create: {
            habit_id: '0730ffac-d039-4194-9571-01aa2aa0efbd'
          }
        }
      }
    }),
    prisma.day.create({
      data: {
        date: new Date('2023-01-06T03:00:00.000z'),
        dayHabits: {
          create: {
            habit_id: '0730ffac-d039-4194-9571-01aa2aa0efbd'
          }
        }
      }
    }),
    prisma.day.create({
      data: {
        date: new Date('2023-01-04T03:00:00.000z'),
        dayHabits: {
          create: [
            { habit_id: '0730ffac-d039-4194-9571-01aa2aa0efbd' },
            { habit_id: '00880d75-a933-4fef-94ab-e05744435297' },
          ]
        }
      }
    })
  ]);

}

run()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect()
    process.exit(1);
  })