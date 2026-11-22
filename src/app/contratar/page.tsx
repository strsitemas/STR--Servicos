"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Etapa = 1 | 2 | 3 | 4;

const servicos = [
  {
    id: "limpeza",
    nome: "Limpeza residencial",
    descricao: "Limpeza regular de ambientes",
    preco: 180,
    icone: "🧹",
  },
  {
    id: "completa",
    nome: "Faxina completa",
    descricao: "Limpeza residencial detalhada",
    preco: 280,
    icone: "✨",
  },
  {
    id: "passadoria",
    nome: "Passadoria",
    descricao: "Cuidados e organização de roupas",
    preco: 120,
    icone: "👕",
  },
  {
    id: "organizacao",
    nome: "Organização doméstica",
    descricao: "Organização de ambientes e armários",
    preco: 200,
    icone: "🏠",
  },
];

const profissionais = [
  {
    id: "ana",
    nome: "Ana Paula R.",
    iniciais: "AR",
    experiencia: "8 anos",
    especialidade: "Limpeza residencial",
    avaliacao: "4,9",
    referencias: "3 referências demonstrativas",
    descricao:
      "Experiência em limpeza e organização de residências.",
  },
  {
    id: "mariana",
    nome: "Mariana S.",
    iniciais: "MS",
    experiencia: "6 anos",
    especialidade: "Faxina e organização",
    avaliacao: "4,8",
    referencias: "2 referências demonstrativas",
    descricao:
      "Atuação em limpeza detalhada e organização de ambientes.",
  },
  {
    id: "carla",
    nome: "Carla M.",
    iniciais: "CM",
    experiencia: "5 anos",
    especialidade: "Passadoria",
    avaliacao: "4,9",
    referencias: "3 referências demonstrativas",
    descricao:
      "Experiência em passadoria e cuidado com roupas.",
  },
];

function registrarFalha(codigo: string, etapa: Etapa) {
  console.warn(
    JSON.stringify({
      timestamp: new Date().toISOString(),
      level: "WARN",
      service: "str-servicos-domesticos",
      module: "ui-002",
      operation: "validar-etapa",
      errorCode: codigo,
      step: etapa,
    })
  );
}

function dinheiro(valor: number) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export default function ContratarPage() {
  const [etapa, setEtapa] = useState<Etapa>(1);
  const [servicoId, setServicoId] = useState("limpeza");
  const [data, setData] = useState("");
  const [horario, setHorario] = useState("09:00");
  const [cidade, setCidade] = useState("Salto - SP");
  const [profissionalId, setProfissionalId] = useState("");
  const [erro, setErro] = useState("");
  const [concluido, setConcluido] = useState(false);

  const servico = servicos.find((s) => s.id === servicoId)!;
  const profissional = profissionais.find(
    (p) => p.id === profissionalId
  );

  const titulos = [
    "Escolha o serviço",
    "Agendamento",
    "Profissional",
    "Revisão",
  ];

  function continuar() {
    setErro("");

    if (etapa === 2 && !data) {
      setErro("Informe uma data para continuar.");
      registrarFalha("DATA_OBRIGATORIA", etapa);
      return;
    }

    if (etapa === 3 && !profissionalId) {
      setErro("Selecione um profissional.");
      registrarFalha("PROFISSIONAL_OBRIGATORIO", etapa);
      return;
    }

    if (etapa < 4) {
      setEtapa((etapa + 1) as Etapa);
    }
  }

  function voltar() {
    setErro("");
    setEtapa((Math.max(1, etapa - 1)) as Etapa);
  }

  return (
    <main className="min-h-screen bg-[#f5f8f8] text-slate-900">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-5">
          <Link href="/" className="text-2xl font-black text-teal-900">
            STR<span className="text-teal-500">.</span>
            <span className="ml-2 text-xs font-medium text-slate-500">
              Serviços Domésticos
            </span>
          </Link>
          <Link
            href="/"
            className="text-sm font-semibold text-teal-800 hover:underline"
          >
            Voltar ao início
          </Link>
        </div>
      </header>

      <section className="bg-gradient-to-r from-teal-950 to-cyan-800 text-white">
        <div className="mx-auto max-w-6xl px-5 py-12">
          <Badge className="bg-white/15 text-white">
            Demonstração UI-002
          </Badge>
          <h1 className="mt-4 text-3xl font-bold md:text-5xl">
            Encontre o serviço ideal para seu lar
          </h1>
          <p className="mt-3 max-w-2xl text-teal-100">
            Escolha o serviço, informe quando precisa e conheça
            os perfis disponíveis nesta demonstração.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-5 py-9">
        <div
          className="mb-8 grid grid-cols-4 gap-2"
          aria-label="Progresso da contratação"
        >
          {titulos.map((titulo, indice) => {
            const numero = indice + 1;
            return (
              <div key={titulo} className="space-y-2">
                <div
                  className={`h-2 rounded-full ${
                    numero <= etapa ? "bg-teal-700" : "bg-slate-200"
                  }`}
                />
                <p
                  className={`text-xs font-semibold md:text-sm ${
                    numero === etapa
                      ? "text-teal-900"
                      : "text-slate-500"
                  }`}
                >
                  {numero}. {titulo}
                </p>
              </div>
            );
          })}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          <Card className="rounded-2xl shadow-sm">
            <CardHeader>
              <CardTitle className="text-2xl">
                {titulos[etapa - 1]}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              {concluido ? (
                <div
                  role="status"
                  className="rounded-xl bg-teal-50 p-6 text-teal-900"
                >
                  <h2 className="text-xl font-bold">
                    Simulação concluída
                  </h2>
                  <p className="mt-2">
                    A jornada demonstrativa foi concluída.
                    Nenhuma solicitação foi enviada,
                    nenhum profissional foi notificado
                    e nenhum pagamento foi realizado.
                  </p>
                </div>
              ) : (
                <>
                  {etapa === 1 && (
                    <div className="grid gap-3 sm:grid-cols-2">
                      {servicos.map((s) => (
                        <button
                          key={s.id}
                          type="button"
                          data-testid={`categoria-${s.id}`}
                          aria-pressed={servicoId === s.id}
                          onClick={() => setServicoId(s.id)}
                          className={`rounded-xl border-2 p-5 text-left transition hover:shadow-md ${
                            servicoId === s.id
                              ? "border-teal-700 bg-teal-50"
                              : "border-slate-200 bg-white"
                          }`}
                        >
                          <div className="text-3xl">{s.icone}</div>
                          <h3 className="mt-3 font-bold">{s.nome}</h3>
                          <p className="mt-1 text-sm text-slate-600">
                            {s.descricao}
                          </p>
                          <p className="mt-4 text-xl font-bold text-teal-800">
                            {dinheiro(s.preco)}
                          </p>
                        </button>
                      ))}
                    </div>
                  )}

                  {etapa === 2 && (
                    <div className="grid gap-5 sm:grid-cols-2">
                      <label className="space-y-2 text-sm font-semibold">
                        <span>Data do serviço</span>
                        <input
                          aria-label="Data do serviço"
                          type="date"
                          value={data}
                          onChange={(e) => setData(e.target.value)}
                          className="w-full rounded-lg border border-slate-300 bg-white p-3"
                        />
                      </label>

                      <label className="space-y-2 text-sm font-semibold">
                        <span>Horário</span>
                        <select
                          aria-label="Horário"
                          value={horario}
                          onChange={(e) => setHorario(e.target.value)}
                          className="w-full rounded-lg border border-slate-300 bg-white p-3"
                        >
                          <option>08:00</option>
                          <option>09:00</option>
                          <option>13:00</option>
                          <option>14:00</option>
                        </select>
                      </label>

                      <label className="space-y-2 text-sm font-semibold sm:col-span-2">
                        <span>Cidade de atendimento</span>
                        <select
                          aria-label="Cidade de atendimento"
                          value={cidade}
                          onChange={(e) => setCidade(e.target.value)}
                          className="w-full rounded-lg border border-slate-300 bg-white p-3"
                        >
                          <option>Salto - SP</option>
                          <option>Itu - SP</option>
                          <option>Indaiatuba - SP</option>
                        </select>
                      </label>
                      <p className="text-sm text-slate-500 sm:col-span-2">
                        A disponibilidade ainda não é consultada no banco.
                        Endereço completo será solicitado na versão
                        com autenticação e proteção de dados.
                      </p>
                    </div>
                  )}

                  {etapa === 3 && (
                    <div className="space-y-4">
                      <p className="text-sm text-slate-600">
                        Perfis e referências fictícios.
                        Nenhuma verificação real foi realizada.
                      </p>
                      {profissionais.map((p) => (
                        <button
                          type="button"
                          key={p.id}
                          data-testid={`perfil-${p.id}`}
                          aria-pressed={profissionalId === p.id}
                          onClick={() => setProfissionalId(p.id)}
                          className={`w-full rounded-xl border-2 p-4 text-left ${
                            profissionalId === p.id
                              ? "border-teal-700 bg-teal-50"
                              : "border-slate-200 bg-white"
                          }`}
                        >
                          <div className="flex items-start gap-4">
                            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-teal-100 text-xl font-bold text-teal-800">
                              {p.iniciais}
                            </div>
                            <div className="min-w-0 flex-1 space-y-1">
                              <div className="font-bold">{p.nome}</div>
                              <div className="text-sm text-slate-600">
                                {p.experiencia} de experiência
                              </div>
                              <div className="text-sm">{p.especialidade}</div>
                              <div className="text-sm text-slate-500">
                                {p.descricao}
                              </div>
                              <div className="pt-2 text-xs text-teal-800">
                                ★ {p.avaliacao} (exemplo)
                                {" · "}{p.referencias}
                              </div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  {etapa === 4 && (
                    <div className="space-y-4">
                      <div className="rounded-xl border bg-slate-50 p-5">
                        <h3 className="mb-3 font-bold">
                          Confira os dados
                        </h3>
                        <dl className="space-y-3 text-sm">
                          <div>
                            <dt className="text-slate-500">Serviço</dt>
                            <dd className="font-semibold">{servico.nome}</dd>
                          </div>
                          <div>
                            <dt className="text-slate-500">Data e horário</dt>
                            <dd className="font-semibold">
                              {data} às {horario}
                            </dd>
                          </div>
                          <div>
                            <dt className="text-slate-500">Cidade</dt>
                            <dd className="font-semibold">{cidade}</dd>
                          </div>
                          <div>
                            <dt className="text-slate-500">Profissional</dt>
                            <dd className="font-semibold">
                              {profissional?.nome}
                            </dd>
                          </div>
                        </dl>
                      </div>
                      <p className="text-sm text-slate-600">
                        Esta etapa apenas demonstra a confirmação.
                        Não existe cobrança, reserva ou contratação.
                      </p>
                    </div>
                  )}

                  {erro && (
                    <p role="alert" className="text-sm font-semibold text-red-700">
                      {erro}
                    </p>
                  )}

                  <div className="flex justify-between gap-3 border-t pt-5">
                    <Button
                      variant="outline"
                      disabled={etapa === 1}
                      onClick={voltar}
                    >
                      Voltar
                    </Button>
                    {etapa < 4 ? (
                      <Button onClick={continuar}>
                        Continuar
                      </Button>
                    ) : (
                      <Button onClick={() => setConcluido(true)}>
                        Simular solicitação
                      </Button>
                    )}
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          <div>
            <Card className="rounded-2xl border-teal-100 bg-white shadow-sm">
              <CardHeader>
                <CardTitle>Resumo do atendimento</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-slate-500">Serviço</p>
                  <p className="font-semibold">{servico.nome}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Agendamento</p>
                  <p className="font-semibold">
                    {data || "A definir"} · {horario}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Região</p>
                  <p className="font-semibold">{cidade}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Profissional</p>
                  <p className="font-semibold">
                    {profissional?.nome || "A selecionar"}
                  </p>
                </div>
                <div className="border-t pt-4">
                  <p className="text-sm text-slate-500">
                    Preço ilustrativo
                  </p>
                  <p
                    data-testid="valor-total"
                    className="text-3xl font-black text-teal-900"
                  >
                    {dinheiro(servico.preco)}
                  </p>
                </div>
                <Badge variant="secondary">
                  Ambiente demonstrativo
                </Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
