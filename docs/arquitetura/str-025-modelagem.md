# STR Serviços Domésticos — Modelagem 025

## Objetivo

Preparar a estrutura inicial PostgreSQL para o
marketplace de intermediação de serviços domésticos.

## Entidades

- clientes
- profissionais
- servicos
- profissional_servicos
- solicitacoes

## Regras de negócio

A STR atua como plataforma intermediadora.

O cadastro do profissional não estabelece
vínculo empregatício automaticamente.

Profissionais iniciam inativos e pendentes
de validação.

Solicitações possuem estados controlados.

Valores monetários são armazenados em centavos.

## Segurança

- Banco Production não deve receber esta migration.
- Não cadastrar dados pessoais reais durante os testes.
- Não conectar Stripe nesta etapa.
- Não expor credenciais em documentação.
- Não permitir acesso público direto às tabelas.
- Autenticação e autorização ainda precisam ser implementadas.
- Endereço completo, documentos e dados sensíveis exigem
  definição de finalidade, controle de acesso e retenção.
- Avaliar política de privacidade, LGPD e condições comerciais
  antes de ativar cadastros reais.

## Estado de homologação

Migration criada, mas NÃO EXECUTADA.

A execução futura deverá verificar a identidade
real do banco de destino e registrar o histórico
de migrations aplicadas.

## Integração

Frontend já publicado em Vercel Preview.

Próximas tarefas:
1. Validar conexão runtime ao Neon homologacao.
2. Aplicar migration de forma controlada.
3. Implantar acesso a dados exclusivamente no servidor.
4. Criar APIs com autenticação e autorização.
5. Executar testes de integração e regressão.
