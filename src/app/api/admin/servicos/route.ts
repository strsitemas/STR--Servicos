import { createHash, timingSafeEqual } from "node:crypto";
import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";
import { validarServico } from "@/lib/admin/servicos";

const headers = {
  "Cache-Control": "private, no-store, max-age=0",
  "X-Content-Type-Options": "nosniff",
};

function resposta(
  status: number,
  mensagem: string
) {
  return NextResponse.json(
    { erro: mensagem },
    { status, headers }
  );
}

function autorizado(request: Request): boolean {
  const secret = process.env.STR_ADMIN_API_TOKEN;

  if (!secret || secret.length < 43) {
    return false;
  }

  const authorization = request.headers.get("authorization");

  if (!authorization?.startsWith("Bearer ")) {
    return false;
  }

  const token = authorization.slice(7);

  const a = createHash("sha256").update(token).digest();
  const b = createHash("sha256").update(secret).digest();

  return timingSafeEqual(a, b);
}

function conexao(request: Request): string | null {
  if (
    process.env.VERCEL_ENV !== "preview" ||
    process.env.NEON_BRANCH_ID !==
      "br-late-glitter-b60qopbx" ||
    process.env.NEON_BRANCH !== "homologacao"
  ) {
    return null;
  }

  if (!autorizado(request)) {
    return null;
  }

  return process.env.DATABASE_URL_UNPOOLED || null;
}

export async function GET(request: Request) {
  const url = conexao(request);

  if (!url) {
    return resposta(403, "Acesso administrativo indisponível");
  }

  try {
    const sql = neon(url);

    const rows = await sql`
      SELECT id, nome, descricao, ativo, criado_em
      FROM str_servicos.servicos
      ORDER BY nome ASC
      LIMIT 100
    `;

    return NextResponse.json(
      { servicos: rows },
      { status: 200, headers }
    );
  } catch {
    return resposta(503, "Consulta indisponível");
  }
}

export async function POST(request: Request) {
  const url = conexao(request);

  if (!url) {
    return resposta(403, "Acesso administrativo indisponível");
  }

  const tamanho = Number(
    request.headers.get("content-length") || "0"
  );

  if (tamanho > 4096) {
    return resposta(413, "Requisição muito grande");
  }

  let entrada: unknown;

  try {
    const corpo = await request.text();

    if (corpo.length > 4096) {
      return resposta(413, "Requisição muito grande");
    }

    entrada = JSON.parse(corpo);
  } catch {
    return resposta(400, "JSON inválido");
  }

  const dados = validarServico(entrada);

  if (!dados) {
    return resposta(400, "Dados inválidos");
  }

  try {
    const sql = neon(url);

    const rows = await sql`
      INSERT INTO str_servicos.servicos (
        nome, descricao
      )
      VALUES (
        ${dados.nome},
        ${dados.descricao}
      )
      ON CONFLICT (nome) DO NOTHING
      RETURNING id, nome, descricao, ativo
    `;

    if (!rows.length) {
      return resposta(409, "Categoria já cadastrada");
    }

    return NextResponse.json(
      { servico: rows[0] },
      { status: 201, headers }
    );
  } catch {
    return resposta(503, "Cadastro indisponível");
  }
}
