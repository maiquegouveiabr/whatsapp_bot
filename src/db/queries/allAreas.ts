import { prisma } from "../db";

export default async function () {
  const allAreas = await prisma.area.findMany({
    orderBy: {
      name: "asc",
    },
  });
  return allAreas.filter(
    (area) => area.id !== 0 && area.id !== 1 && area.id !== 2
  );
}
