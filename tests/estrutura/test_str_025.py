import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
SQL = (
    ROOT
    / "db/migrations/20261123_025_modelagem_inicial.sql"
).read_text()


class ModelagemSTR025(unittest.TestCase):
    def test_transacao(self):
        self.assertIn("BEGIN;", SQL)
        self.assertIn("COMMIT;", SQL)

    def test_entidades(self):
        for table in (
            "clientes",
            "profissionais",
            "servicos",
            "profissional_servicos",
            "solicitacoes",
        ):
            self.assertIn(
                f"CREATE TABLE str_servicos.{table}",
                SQL,
            )

    def test_protecao_valor(self):
        self.assertIn("valor_estimado_centavos >= 0", SQL)

    def test_validacao_profissional(self):
        self.assertIn(
            "DEFAULT 'PENDENTE'", SQL
        )
        self.assertIn(
            "DEFAULT FALSE", SQL
        )

    def test_sem_operacoes_destrutivas(self):
        for statement in ("DROP TABLE", "TRUNCATE", "DELETE FROM"):
            self.assertNotIn(statement, SQL.upper())


if __name__ == "__main__":
    unittest.main(verbosity=2)
