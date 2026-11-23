import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";


const EXPECTED_BRANCH = "br-late-glitter-b60qopbx";

export async function GET() {
  const headers = {
    "Cache-Control": "no-store, max-age=0",
  };

  // Este diagnostico so pode consultar homologacao.
  if (
    process.env.VERCEL_ENV !== "preview" ||
    process.env.NEON_BRANCH_ID !== EXPECTED_BRANCH ||
    process.env.NEON_BRANCH !== "homologacao"
  ) {
    return NextResponse.json(
      { status: "unavailable" },
      { status: 503, headers }
    );
  }

  const connection = process.env.DATABASE_URL_UNPOOLED;

  if (!connection) {
    return NextResponse.json(
      { status: "unavailable" },
      { status: 503, headers }
    );
  }

  try {
    const sql = neon(connection);

    const rows = await sql`
      SELECT COUNT(*)::integer AS total
      FROM information_schema.tables
      WHERE table_schema = 'str_servicos'
        AND table_name IN (
          'clientes',
          'profissionais',
          'servicos',
          'profissional_servicos',
          'solicitacoes'
        )
    `;

    if (Number(rows[0]?.total) !== 5) {
      return NextResponse.json(
        { status: "unavailable" },
        { status: 503, headers }
      );
    }

    return NextResponse.json(
      {
        status: "ok",
        database: "connected",
        schema: "ready"
      },
      { status: 200, headers }
    );
  } catch {
    // Nao devolver SQL, host, usuario ou senha.
    return NextResponse.json(
      { status: "unavailable" },
      { status: 503, headers }
    );
  }
}
