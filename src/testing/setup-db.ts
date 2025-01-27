import { vi } from "vitest";
import { prisma } from "@/server/adapters/db/client";
import { exec } from "node:child_process";
import { promisify } from "node:util";

vi.mock("@/server/adapters/db", () => ({
  prisma: vPrisma.client,
}));

async function clearDatabase() {
  await prisma.$executeRaw`
    DO
    $func$
    BEGIN
      EXECUTE (
        SELECT 'TRUNCATE TABLE ' || string_agg(quote_ident(table_name), ', ') || ' RESTART IDENTITY CASCADE'
        FROM   information_schema.tables
        WHERE  table_schema = 'public'
        AND    table_type = 'BASE TABLE'
      );
    END
    $func$;
  `;
}

beforeAll(async () => {
  await promisify(exec)("npx prisma db push --accept-data-loss");
  await prisma.$connect();
  await clearDatabase();
}, 60000);

afterAll(async () => {
  await prisma.$disconnect();
});
