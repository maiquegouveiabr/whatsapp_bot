import { prisma } from "../db";

export default async function () {
  const now = new Date();
  const offset = 3 * 60 * 60 * 1000;
  const nowUTC3 = new Date(now.getTime() - offset);

  // Get start and end of todays date in UTC-3
  const startOfDay = new Date(
    nowUTC3.getUTCFullYear(),
    nowUTC3.getUTCMonth(),
    nowUTC3.getUTCDate()
  );
  const endOfDay = new Date(startOfDay.getTime() + 24 * 60 * 60 * 1000);

  const allReferences = await prisma.reference.findMany({
    where: {
      sent_date: {
        gte: startOfDay,
        lt: endOfDay,
      },
    },
    include: {
      area: {
        select: {
          name: true,
          zone_id: true,
        },
      },
    },
  });

  return allReferences.filter((ref) => ref.area_id !== 2);
}
