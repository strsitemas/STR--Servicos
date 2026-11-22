"use client";

// STR-UI-001: prototipo visual sem contratacoes reais.

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const servicos = [
  {
    id: "faxina",
    nome: "Limpeza residencial",
    subtitulo: "Manutencao e limpeza de ambientes",
    icone: "🧹",
    preco: 180,
  },
  {
    id: "pesada",
    nome: "Faxina completa",
    subtitulo: "Limpeza detalhada e intensiva",
    icone: "✨",
    preco: 280,
  },
  {
    id: "passadoria",
    nome: "Passadoria",
    subtitulo: "Organizacao e cuidado com roupas",
    icone: "👕",
    preco: 120,
  },
  {
    id: "organizacao",
    nome: "Organizacao",
    subtitulo: "Armarios e ambientes residenciais",
    icone: "🏠",
    preco: 200,
  },
];

const profissionais = [
  {
    id: "p1",
    nome: "Mariana S.",
    experiencia: "6 anos de experiencia",
    especialidade: "Limpeza e organizacao",
    avaliacao: "4,9",
    iniciais: "MS",
  },
  {
    id: "p2",
    nome: "Ana Paula R.",
    experiencia: "8 anos de experiencia",
    especialidade: "Faxina residencial",
    avaliacao: "4,8",
    iniciais: "AR",
  },
  {
    id: "p3",
    nome: "Carla M.",
    experiencia: "5 anos de experiencia",
    especialidade: "Passadoria e organizacao",
    avaliacao: "4,9",
    iniciais: "CM",
  },
];

const dinheiro = (n: number) =>
  n.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

export default function Home() {
  const [servico, setServico] = useState("faxina");
  const [data, setData] = useState("");
  const [horario, setHorario] = useState("09:00");
  const [regiao, setRegiao] = useState("Salto - SP");
  const [selecionado, setSelecionado] = useState("");
  const [area, setArea] = useState<"cliente" | "profissional">(
    "cliente"
  );

  const ativo = servicos.find((s) => s.id === servico)!;
  const escolhido = profissionais.find(
    (p) => p.id === selecionado
  );

  return (
    <main className="min-h-screen bg-[#f5f8f8] text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-5">
          <div>
            <div className="text-2xl font-black tracking-tight text-teal-900">
              STR<span className="text-teal-500">.</span>
            </div>
            <div className="text-xs font-medium text-slate-500">
              Serviços Domésticos
            </div>
          </div>
          <nav className="flex gap-2" aria-label="Areas">
            <Button
              variant={area === "cliente" ? "default" : "outline"}
              onClick={() => setArea("cliente")}
            >
              Sou cliente
            </Button>
            <Button
              variant={area === "profissional" ? "default" : "outline"}
              onClick={() => setArea("profissional")}
            >
              Sou profissional
            </Button>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-br from-teal-950 via-teal-900 to-cyan-800 text-white">
        <div className="mx-auto max-w-6xl px-5 py-14 md:py-20">
          <Badge className="bg-teal-700 text-white">
            Protótipo demonstrativo
          </Badge>
          <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-tight tracking-tight md:text-6xl">
            Mais praticidade para cuidar do seu lar.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-teal-100">
            Encontre profissionais independentes, conheça suas
            experiências e organize serviços domésticos
            com transparência.
          </p>
          <div className="mt-7 flex flex-wrap gap-3 text-sm">
            <span className="rounded-full bg-white/10 px-4 py-2">
              ✓ Preços transparentes
            </span>
            <span className="rounded-full bg-white/10 px-4 py-2">
              ✓ Perfis verificados
            </span>
            <span className="rounded-full bg-white/10 px-4 py-2">
              ✓ Agendamento prático
            </span>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-9 px-5 py-10">
        {area === "profissional" ? (
          <Card>
            <CardHeader>
              <CardTitle>Área do profissional</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-slate-600">
                Ofereça seus serviços com autonomia.
                Na versão completa, você poderá cadastrar
                experiências, referências e disponibilidade,
                além de aceitar ou recusar solicitações.
              </p>
              <Badge variant="secondary">
                Cadastro em desenvolvimento
              </Badge>
            </CardContent>
          </Card>
        ) : (
          <>
            <section>
              <div className="mb-5">
                <h2 className="text-2xl font-bold">
                  Qual serviço você procura?
                </h2>
                <p className="text-slate-500">
                  Escolha uma categoria para visualizar o valor.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {servicos.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    data-testid={`servico-${s.id}`}
                    onClick={() => {
                      setServico(s.id);
                      setSelecionado("");
                    }}
                    aria-pressed={servico === s.id}
                    className={`rounded-2xl border-2 bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md ${
                      servico === s.id
                        ? "border-teal-700 ring-2 ring-teal-100"
                        : "border-transparent"
                    }`}
                  >
                    <span className="text-4xl">{s.icone}</span>
                    <div className="mt-4 font-semibold">{s.nome}</div>
                    <p className="mt-1 min-h-12 text-sm text-slate-500">
                      {s.subtitulo}
                    </p>
                    <div className="mt-4 text-xl font-bold text-teal-800">
                      {dinheiro(s.preco)}
                    </div>
                    <div className="text-xs text-slate-400">
                      Valor demonstrativo
                    </div>
                  </button>
                ))}
              </div>
            </section>

            <section className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
              <Card className="rounded-2xl">
                <CardHeader>
                  <CardTitle>Agende seu serviço</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 sm:grid-cols-2">
                  <label className="space-y-2 text-sm font-medium">
                    <span>Data</span>
                    <input
                      aria-label="Data"
                      type="date"
                      value={data}
                      onChange={(e) => setData(e.target.value)}
                      className="w-full rounded-lg border p-3"
                    />
                  </label>
                  <label className="space-y-2 text-sm font-medium">
                    <span>Horário</span>
                    <select
                      aria-label="Horário"
                      value={horario}
                      onChange={(e) => setHorario(e.target.value)}
                      className="w-full rounded-lg border bg-white p-3"
                    >
                      <option value="08:00">08:00</option>
                      <option value="09:00">09:00</option>
                      <option value="13:00">13:00</option>
                      <option value="14:00">14:00</option>
                    </select>
                  </label>
                  <label className="space-y-2 text-sm font-medium sm:col-span-2">
                    <span>Região</span>
                    <select
                      aria-label="Região"
                      value={regiao}
                      onChange={(e) => setRegiao(e.target.value)}
                      className="w-full rounded-lg border bg-white p-3"
                    >
                      <option>Salto - SP</option>
                      <option>Itu - SP</option>
                      <option>Indaiatuba - SP</option>
                    </select>
                  </label>
                </CardContent>
              </Card>

              <Card className="rounded-2xl border-teal-100 bg-teal-50">
                <CardHeader>
                  <CardTitle>Resumo do serviço</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between gap-3">
                    <span>Serviço</span>
                    <strong>{ativo.nome}</strong>
                  </div>
                  <div className="flex justify-between gap-3">
                    <span>Região</span>
                    <strong>{regiao}</strong>
                  </div>
                  <div className="flex justify-between gap-3">
                    <span>Agendamento</span>
                    <strong>{data || "A definir"} · {horario}</strong>
                  </div>
                  <div className="border-t border-teal-200 pt-4">
                    <p className="text-sm">Valor demonstrativo</p>
                    <p
                      data-testid="resumo-preco"
                      className="text-3xl font-black text-teal-900"
                    >
                      {dinheiro(ativo.preco)}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section>
              <h2 className="mb-2 text-2xl font-bold">
                Conheça os profissionais
              </h2>
              <p className="mb-5 text-slate-500">
                Perfis fictícios para avaliação da interface.
                Disponibilidade e referências ainda não são reais.
              </p>
              <div className="grid gap-4 md:grid-cols-3">
                {profissionais.map((p) => (
                  <Card key={p.id} className="rounded-2xl">
                    <CardContent className="space-y-4 pt-6">
                      <div className="flex items-center gap-4">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-teal-100 text-xl font-bold text-teal-800">
                          {p.iniciais}
                        </div>
                        <div>
                          <h3 className="font-bold">{p.nome}</h3>
                          <p className="text-sm text-slate-500">
                            {p.experiencia}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm">{p.especialidade}</p>
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary">
                          ★ {p.avaliacao} · exemplo
                        </Badge>
                        <Badge variant="outline">
                          Perfil demonstrativo
                        </Badge>
                      </div>
                      <Button
                        className="w-full"
                        data-testid={`selecionar-${p.id}`}
                        onClick={() => setSelecionado(p.id)}
                      >
                        {selecionado === p.id
                          ? "Selecionado"
                          : "Selecionar profissional"}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
              {escolhido && (
                <div
                  role="status"
                  className="mt-5 rounded-xl border border-teal-200 bg-teal-50 p-4 text-teal-900"
                >
                  <strong>{escolhido.nome}</strong> selecionada
                  para demonstração. Nenhum pedido foi enviado
                  e nenhum pagamento será realizado.
                </div>
              )}
            </section>
          </>
        )}
      </div>

      <footer className="border-t bg-white px-5 py-8 text-center text-sm text-slate-500">
        STR Serviços Domésticos — Plataforma de intermediação
        de profissionais independentes.
        <p className="mt-2">
          Protótipo UI-001 · Sem contratação ou cobrança real.
        </p>
      </footer>
    </main>
  );
}
