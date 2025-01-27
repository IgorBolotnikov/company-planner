import { prisma } from "@/server/adapters/db";

async function main() {
  await prisma.user.deleteMany();
  console.log("Database flushed");
}

main()
  .then(async () => {
    await prisma.user.deleteMany();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
