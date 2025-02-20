import { prisma } from "../db";

export default async function () {
  const allReferences = await prisma.reference.findMany();
  return allReferences.filter((ref) => ref.area_id !== 2);
}
