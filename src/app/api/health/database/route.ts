import { NextResponse, connection } from "next/server";
import { neon } from "@neondatabase/serverless";


export async function GET() {
  await connection();
  // Desabilitado por padrao em qualquer ambiente.
  if (process.env.STR_DB_HEALTHCHECK !== "enabled") {
    return new Response(null, { status: 404 });
  }

  try {
    const url = process.env.DATABASE_URL;
    if (!url) throw new Error("Database URL ausente");

    const sql = neon(url);
    const result = await sql`SELECT 1 AS conectado`;

    if (Number(result[0]?.conectado) !== 1) {
      throw new Error("Consulta nao validada");
    }

    return NextResponse.json(
      { status: "ok", database: "connected" },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch {
    return NextResponse.json(
      { status: "error", database: "unavailable" },
      { status: 503 }
    );
  }
}
