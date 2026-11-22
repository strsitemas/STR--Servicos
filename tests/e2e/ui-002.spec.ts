import { test, expect } from "@playwright/test";

test("servico altera preco do resumo", async ({ page }) => {
  await page.goto("/contratar");

  await page.getByTestId("categoria-passadoria").click();

  await expect(page.getByTestId("valor-total"))
    .toContainText("120,00");
});

test("data obrigatoria impede avancar", async ({ page }) => {
  await page.goto("/contratar");

  await page.getByRole("button", { name: "Continuar" }).click();
  await page.getByRole("button", { name: "Continuar" }).click();

  await expect(page.locator("p[role=\"alert\"]"))
    .toContainText("Informe uma data");
});

test("jornada completa simulada", async ({ page }) => {
  await page.goto("/contratar");

  await page.getByTestId("categoria-completa").click();
  await page.getByRole("button", { name: "Continuar" }).click();

  await page.getByLabel("Data do serviço").fill("2099-12-20");
  await page.getByLabel("Horário").selectOption("13:00");
  await page.getByLabel("Cidade de atendimento")
    .selectOption("Itu - SP");

  await page.getByRole("button", { name: "Continuar" }).click();
  await page.getByTestId("perfil-ana").click();
  await page.getByRole("button", { name: "Continuar" }).click();

  await expect(page.getByTestId("valor-total"))
    .toContainText("280,00");

  await page.getByRole("button", {
    name: "Simular solicitação",
  }).click();

  await expect(page.getByRole("status"))
    .toContainText("Simulação concluída");
});

test("navegacao de retorno funciona", async ({ page }) => {
  await page.goto("/contratar");
  await page.getByRole("button", { name: "Continuar" }).click();
  await page.getByRole("button", { name: "Voltar" }).click();

  await expect(page.getByTestId("categoria-limpeza"))
    .toBeVisible();
});

test("interface responsiva no celular", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/contratar");

  await expect(page.getByTestId("categoria-limpeza"))
    .toBeVisible();
  await expect(page.getByTestId("valor-total"))
    .toBeVisible();
});
