# STR-VERCEL-021
## Primeiro deployment e desbloqueio de Preview

Status: PROCEDIMENTO PROPOSTO — NÃO EXECUTADO
Data do incidente: 22/11/2026
Projeto: STR Serviços Domésticos

### 1. Infraestrutura

GitHub:
- Repositório: strsitemas/STR--Servicos
- Commit homologado: 7115c16

Vercel:
- Equipe: str-software
- Projeto: str-servicos-domesticos
- CLI observada: 66.6.0
- Node.js configurado: 22.x

Neon:
- Projeto: STR--Servicos
- Production: br-hidden-cloud-b663doq8
- Homologacao: br-late-glitter-b60qopbx

### 2. Problema identificado

Ao tentar publicar o primeiro Preview:

vercel deploy --target=preview --yes --scope str-software

A CLI retornou:

Can't create a Preview deployment.
This project has no deployments yet,
and a project's first deployment is assigned
to Production.

O CLI indicou que o primeiro deployment
deveria ser realizado com --prod.

Também informou que --target está obsoleto
e recomendou utilizar --environment.

### 3. Diagnóstico confirmado

O projeto Vercel foi criado e vinculado.

A aplicação foi homologada localmente:
- Next.js build aprovado
- TypeScript aprovado
- ESLint aprovado
- 9 testes Playwright E2E aprovados

A falha ocorreu antes da criação do Preview.

Não há evidência de defeito na interface
ou na conexão local com PostgreSQL.

O cadastro das variáveis Preview foi informado
como concluído pela CLI, mas seu funcionamento
remoto permanece não homologado.

### 4. Estratégia de recuperação proposta

A estratégia é criar um primeiro deployment
Production contendo exclusivamente uma página
temporária de manutenção.

Essa publicação deve:
- Utilizar apenas o projeto STR Serviços Domésticos
- Não conter integrações com PostgreSQL
- Não conter pagamentos Stripe
- Não conter formulários funcionais
- Não processar dados pessoais
- Não alterar a branch main do GitHub
- Não promover a aplicação comercial

Após o bootstrap:
- Conferir o deployment inicial
- Solicitar Preview explicitamente
- Confirmar ambiente Preview e estado Ready
- Testar as rotas / e /contratar
- Confirmar o commit e a versão implantada
- Registrar logs e evidências
- Preservar Production como manutenção

### 5. Proteções obrigatórias

Antes de qualquer deployment:
- Exigir autorização explícita para Production
- Confirmar projectId e orgId
- Preservar bancos Neon
- Não copiar credenciais para logs
- Não executar migrações
- Não utilizar Stripe real
- Não alterar projetos STR existentes
- Evitar comandos interativos
- Não utilizar vercel promote

Caso ocorra falha:
- Interromper no ponto identificado
- Registrar etapa, código de erro e deployment ID
- Preservar logs sem dados sensíveis
- Não repetir instalações homologadas
- Não recriar projetos existentes
- Não reiniciar todo o processo

### 6. Critérios de homologação futura

A estratégia só será considerada validada se:
1. Bootstrap Production apresentar estado Ready
2. Production não acessar Neon
3. Deployment Preview for criado
4. Preview apresentar estado Ready
5. Páginas / e /contratar responderem corretamente
6. Versão publicada corresponder ao código esperado
7. Não ocorrer alteração no banco Production
8. Logs e documentação forem registrados

Caso os critérios não sejam atendidos,
o procedimento continuará pendente.

### 7. Situação atual

- GitHub: sincronizado
- Neon: branches separadas
- UI-001 e UI-002: homologadas localmente
- Vercel: projeto configurado
- Preview: ainda não publicado
- Bootstrap Production: não executado

### 8. Diretriz STR

Consultar este documento antes de qualquer
nova tentativa de primeiro deployment.

Não repetir diagnósticos já concluídos sem
nova evidência.

Registrar a solução efetivamente executada
após sua homologação.

Este documento não constitui autorização
para implantação em produção.
