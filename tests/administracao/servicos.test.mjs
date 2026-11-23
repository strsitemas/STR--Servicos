import assert from "node:assert/strict";
import test from "node:test";
import { validarServico } from
  "../../src/lib/admin/servicos.ts";

test("aceita categoria válida", () => {
  assert.deepEqual(
    validarServico({
      nome: " Limpeza residencial ",
      descricao: " Serviço doméstico ",
    }),
    {
      nome: "Limpeza residencial",
      descricao: "Serviço doméstico",
    }
  );
});

test("rejeita nome muito curto", () => {
  assert.equal(validarServico({ nome: "A" }), null);
});

test("rejeita objetos inválidos", () => {
  assert.equal(validarServico(null), null);
  assert.equal(validarServico([]), null);
});

test("rejeita descrição excessiva", () => {
  assert.equal(
    validarServico({
      nome: "Limpeza",
      descricao: "x".repeat(1001),
    }),
    null
  );
});

test("não exige descrição", () => {
  assert.deepEqual(
    validarServico({ nome: "Passadoria" }),
    { nome: "Passadoria", descricao: null }
  );
});
