import { test, expect } from "@playwright/test";

test("cliente visualiza servicos e preco", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("Qual serviço você procura?"))
    .toBeVisible();
  await page.getByTestId("servico-passadoria").click();
  await expect(page.getByTestId("resumo-preco"))
    .toContainText("120,00");
});

test("cliente escolhe profissional demonstrativo", async ({ page }) => {
  await page.goto("/");
  await page.getByTestId("selecionar-p1").click();
  await expect(page.getByRole("status"))
    .toContainText("Mariana S.");
});

test("profissional acessa a sua area", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", {
    name: "Sou profissional",
  }).click();
  await expect(page.getByText("Área do profissional"))
    .toBeVisible();
});

test("interface funciona em celular", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await expect(page.getByTestId("servico-faxina"))
    .toBeVisible();
  await expect(page.getByTestId("resumo-preco"))
    .toBeVisible();
});
