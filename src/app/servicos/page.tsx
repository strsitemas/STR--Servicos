"use client";

import Link from "next/link";

import { useEffect, useMemo, useState } from "react";

type Servico = {
  id: string;
  nome: string;
  descricao: string | null;
};

type Profissional = {
  id: string;
  nome: string;
  cidade: string;
  uf: string;
  servicoId: string;
};

type Catalogo = {
  servicos: Servico[];
  profissionais: Profissional[];
};

export default function PaginaServicos() {
  const [dados, setDados] = useState<Catalogo | null>(null);
  const [erro, setErro] = useState(false);
  const [servicoId, setServicoId] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function carregar() {
      try {
        const resposta = await fetch("/api/catalogo", {
          cache: "no-store",
          signal: controller.signal,
        });

        if (!resposta.ok) {
          throw new Error("Falha na consulta");
        }

        const resultado: Catalogo = await resposta.json();

        if (
          !Array.isArray(resultado.servicos) ||
          !Array.isArray(resultado.profissionais)
        ) {
          throw new Error("Resposta invalida");
        }

        setDados(resultado);
      } catch {
        if (!controller.signal.aborted) {
          setErro(true);
        }
      }
    }

    void carregar();

    return () => controller.abort();
  }, []);

  const profissionais = useMemo(() => {
    if (!dados) return [];

    const filtrados = servicoId
      ? dados.profissionais.filter(
          (p) => p.servicoId === servicoId
        )
      : dados.profissionais;

    return Array.from(
      new Map(filtrados.map((p) => [p.id, p])).values()
    );
  }, [dados, servicoId]);

  return (
    <main className="min-h-screen bg-slate-50 px-5 py-12 text-slate-900">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/"
          className="text-sm font-semibold text-teal-700"
        >
          STR Serviços Domésticos
        </Link>

        <section className="mt-10 rounded-3xl bg-teal-950 px-7 py-12 text-white shadow-sm md:px-12">
          <p className="text-sm font-semibold uppercase tracking-widest text-teal-200">
            Serviços domésticos
          </p>
          <h1 className="mt-4 text-3xl font-bold md:text-5xl">
            Encontre o serviço certo para você
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-teal-100">
            Conheça as categorias disponíveis e os
            profissionais independentes aprovados
            na plataforma.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-bold">
            Catálogo de serviços
          </h2>

          {!dados && !erro && (
            <p role="status" className="mt-5 text-slate-600">
              Consultando serviços disponíveis...
            </p>
          )}

          {erro && (
            <p role="alert" className="mt-5 text-rose-700">
              Não foi possível consultar o catálogo agora.
            </p>
          )}

          {dados && (
            <>
              {dados.servicos.length === 0 ? (
                <p className="mt-5 rounded-xl border bg-white p-6 text-slate-600">
                  Estamos preparando as primeiras
                  categorias de serviços.
                </p>
              ) : (
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  {dados.servicos.map((servico) => (
                    <article
                      key={servico.id}
                      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                    >
                      <h3 className="font-semibold">
                        {servico.nome}
                      </h3>
                      <p className="mt-2 text-sm text-slate-600">
                        {servico.descricao ||
                          "Serviço disponível para consulta."}
                      </p>
                    </article>
                  ))}
                </div>
              )}

              <div className="mt-12">
                <h2 className="text-2xl font-bold">
                  Profissionais aprovados
                </h2>
                <label
                  htmlFor="servico"
                  className="mt-5 block text-sm font-medium"
                >
                  Filtrar por serviço
                </label>
                <select
                  id="servico"
                  value={servicoId}
                  onChange={(e) => setServicoId(e.target.value)}
                  className="mt-2 w-full max-w-md rounded-xl border border-slate-300 bg-white px-4 py-3"
                >
                  <option value="">Todos os serviços</option>
                  {dados.servicos.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.nome}
                    </option>
                  ))}
                </select>

                {profissionais.length === 0 ? (
                  <p className="mt-6 rounded-xl border bg-white p-6 text-slate-600">
                    Ainda não há profissionais aprovados
                    para este filtro.
                  </p>
                ) : (
                  <div className="mt-6 grid gap-4 md:grid-cols-2">
                    {profissionais.map((p) => (
                      <article
                        key={p.id}
                        className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                      >
                        <h3 className="font-semibold">
                          {p.nome}
                        </h3>
                        <p className="mt-2 text-sm text-slate-600">
                          {p.cidade} — {p.uf}
                        </p>
                        <span className="mt-4 inline-block rounded-full bg-teal-50 px-3 py-1 text-xs font-medium text-teal-800">
                          Cadastro aprovado
                        </span>
                      </article>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </section>

        <p className="mt-12 text-xs leading-6 text-slate-500">
          A STR atua como plataforma de intermediação.
          Os profissionais são prestadores independentes.
          O catálogo não representa disponibilidade
          imediata nem contratação confirmada.
        </p>
      </div>
    </main>
  );
}
