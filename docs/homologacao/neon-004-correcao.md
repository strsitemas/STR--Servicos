# STR Serviços Domésticos — Correção Neon 004

## Causa

Next.js 16.4.6 com cacheComponents habilitado
não aceita as declarações runtime e dynamic
utilizadas na rota de diagnóstico PostgreSQL.

## Correção

Removidas somente as declarações incompatíveis.

## Preservação

- Conexão Neon mantida.
- Credenciais preservadas.
- Banco production não alterado.
- Nenhuma migração executada.
- Nenhum deploy realizado.
- Nenhum arquivo de ambiente versionado.

## Validação

TypeScript, ESLint e build executados pelo
script de correção.

O teste HTTP de conexão real permanece
pendente até sua execução específica.
