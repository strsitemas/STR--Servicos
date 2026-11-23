import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

const headers = {
  "Cache-Control": "private, no-store, max-age=0",
  "X-Content-Type-Options": "nosniff",
};

export async function GET() {
  if (
    process.env.VERCEL_ENV !== "preview" ||
    process.env.NEON_BRANCH_ID !== "br-late-glitter-b60qopbx" ||
    process.env.NEON_BRANCH !== "homologacao"
  ) {
    return NextResponse.json(
      { error: "Catalogo indisponivel" },
      { status: 503, headers }
    );
  }

  const connection = process.env.DATABASE_URL_UNPOOLED;

  if (!connection) {
    return NextResponse.json(
      { error: "Catalogo indisponivel" },
      { status: 503, headers }
    );
  }

  try {
    const sql = neon(connection);

    const servicosRows = await sql`
      SELECT id, nome, descricao
      FROM str_servicos.servicos
      WHERE ativo = TRUE
      ORDER BY nome ASC
      LIMIT 50
    `;

    const profissionaisRows = await sql`
      SELECT DISTINCT
        p.id,
        p.nome_exibicao,
        p.cidade,
        p.uf,
        s.id AS servico_id
      FROM str_servicos.profissionais p
      INNER JOIN str_servicos.profissional_servicos ps
        ON ps.profissional_id = p.id
      INNER JOIN str_servicos.servicos s
        ON s.id = ps.servico_id
      WHERE p.ativo = TRUE
        AND p.status_validacao = 'APROVADO'
        AND s.ativo = TRUE
      ORDER BY p.nome_exibicao, p.id, s.id
      LIMIT 100
    `;

    const servicos = servicosRows.map((r) => ({
      id: String(r.id),
      nome: String(r.nome),
      descricao: r.descricao ? String(r.descricao) : null,
    }));

    const profissionais = profissionaisRows.map((r) => ({
      id: String(r.id),
      nome: String(r.nome_exibicao),
      cidade: String(r.cidade),
      uf: String(r.uf),
      servicoId: String(r.servico_id),
    }));

    return NextResponse.json(
      { servicos, profissionais },
      { status: 200, headers }
    );
  } catch {
    return NextResponse.json(
      { error: "Catalogo indisponivel" },
      { status: 503, headers }
    );
  }
}
