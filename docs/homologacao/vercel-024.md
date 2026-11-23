# STR Serviços Domésticos — Homologação Vercel 024

Data UTC: 2026-11-23T00:17:45.589655+00:00

## Incidente e resolução

O projeto não permitia seu primeiro deployment em Preview.
Foi criado um bootstrap Production de manutenção e, em seguida,
um deployment Preview da aplicação STR.

O STR 022 apresentou falso negativo ao verificar status Ready,
porque a saída do comando vercel inspect foi interpretada
somente por stdout. O STR 023 corrigiu a verificação.

## Endereços

- Production de manutenção: https://str-servicos-domesticos-bj6zba9l6-str-software.vercel.app
- Preview STR: https://str-servicos-domesticos-a9eug6lqn-str-software.vercel.app

## Testes HTTP

- Production /: HTTP 200
- Preview /: HTTP 200
- Preview /contratar: HTTP 200

## Restrições

- Nenhum novo deployment na etapa 024
- Nenhuma alteração no Neon
- Nenhuma migração executada
- Nenhum pagamento ativado
- Integração remota com Neon ainda não homologada
- Testes HTTP não comprovam identidade do commit remoto

## Referências

- docs/operacao/vercel-primeiro-deploy.md
- docs/homologacao/vercel-023.md
