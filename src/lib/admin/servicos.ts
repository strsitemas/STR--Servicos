export type NovoServico = {
  nome: string;
  descricao: string | null;
};

export function validarServico(
  entrada: unknown
): NovoServico | null {
  if (
    entrada === null ||
    typeof entrada !== "object" ||
    Array.isArray(entrada)
  ) {
    return null;
  }

  const dados = entrada as Record<string, unknown>;

  if (
    typeof dados.nome !== "string" ||
    dados.nome.trim().length < 3 ||
    dados.nome.trim().length > 120
  ) {
    return null;
  }

  if (
    dados.descricao !== undefined &&
    dados.descricao !== null &&
    typeof dados.descricao !== "string"
  ) {
    return null;
  }

  const descricao =
    typeof dados.descricao === "string"
      ? dados.descricao.trim()
      : null;

  if (descricao !== null && descricao.length > 1000) {
    return null;
  }

  return {
    nome: dados.nome.trim(),
    descricao: descricao || null,
  };
}
