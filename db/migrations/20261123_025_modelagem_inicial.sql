-- STR Serviços Domésticos
-- Migration 025: estrutura inicial
-- Executar somente após confirmar destino Neon homologacao.
-- Não executar automaticamente em Production.

BEGIN;

CREATE SCHEMA IF NOT EXISTS str_servicos;

CREATE TABLE str_servicos.clientes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome VARCHAR(160) NOT NULL,
    email VARCHAR(254) NOT NULL,
    telefone VARCHAR(30),
    ativo BOOLEAN NOT NULL DEFAULT TRUE,
    criado_em TIMESTAMPTZ NOT NULL DEFAULT now(),
    atualizado_em TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX clientes_email_unico
ON str_servicos.clientes (lower(email));

CREATE TABLE str_servicos.profissionais (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome_exibicao VARCHAR(160) NOT NULL,
    apresentacao TEXT,
    cidade VARCHAR(120) NOT NULL,
    uf CHAR(2) NOT NULL,
    status_validacao VARCHAR(20) NOT NULL
        DEFAULT 'PENDENTE',
    ativo BOOLEAN NOT NULL DEFAULT FALSE,
    criado_em TIMESTAMPTZ NOT NULL DEFAULT now(),
    atualizado_em TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT profissionais_status_check
        CHECK (status_validacao IN (
            'PENDENTE', 'APROVADO',
            'REPROVADO', 'SUSPENSO'
        ))
);

CREATE TABLE str_servicos.servicos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome VARCHAR(120) NOT NULL UNIQUE,
    descricao TEXT,
    ativo BOOLEAN NOT NULL DEFAULT TRUE,
    criado_em TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE str_servicos.profissional_servicos (
    profissional_id UUID NOT NULL
        REFERENCES str_servicos.profissionais(id),
    servico_id UUID NOT NULL
        REFERENCES str_servicos.servicos(id),
    PRIMARY KEY (profissional_id, servico_id)
);

CREATE TABLE str_servicos.solicitacoes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cliente_id UUID NOT NULL
        REFERENCES str_servicos.clientes(id),
    profissional_id UUID
        REFERENCES str_servicos.profissionais(id),
    servico_id UUID NOT NULL
        REFERENCES str_servicos.servicos(id),
    data_prevista TIMESTAMPTZ,
    cidade VARCHAR(120) NOT NULL,
    uf CHAR(2) NOT NULL,
    observacoes TEXT,
    valor_estimado_centavos BIGINT,
    status VARCHAR(25) NOT NULL DEFAULT 'SOLICITADA',
    criado_em TIMESTAMPTZ NOT NULL DEFAULT now(),
    atualizado_em TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT solicitacoes_valor_check
        CHECK (
            valor_estimado_centavos IS NULL
            OR valor_estimado_centavos >= 0
        ),
    CONSTRAINT solicitacoes_status_check
        CHECK (status IN (
            'SOLICITADA',
            'EM_ANALISE',
            'ACEITA',
            'CANCELADA',
            'CONCLUIDA'
        ))
);

CREATE INDEX solicitacoes_cliente_idx
ON str_servicos.solicitacoes
(cliente_id, criado_em DESC);

CREATE INDEX solicitacoes_profissional_idx
ON str_servicos.solicitacoes
(profissional_id, criado_em DESC);

CREATE INDEX solicitacoes_status_idx
ON str_servicos.solicitacoes (status);

COMMIT;
