# STR 027-A — Recuperação Next.js / Neon

## Incidente

A primeira implementação do endpoint `/api/health/db`
falhou no build do Next.js 16.4.6 porque o projeto
utiliza `cacheComponents`.

As configurações de segmento `runtime` e `dynamic`
eram incompatíveis com essa configuração.

## Correção aplicada

As duas declarações foram removidas.

A consulta PostgreSQL, as verificações da branch
de homologação e os cabeçalhos de proteção foram mantidos.

## Evidências recebidas

- Build Next.js aprovado
- TypeScript aprovado
- ESLint aprovado
- Commit de correção: b173391
- Vercel Preview: Ready
- Neon: Connected
- Schema: Ready

## Diretriz

Não repetir configurações de segmento incompatíveis
com `cacheComponents`.

Não repetir migrações ou bootstrap Vercel já homologados.
