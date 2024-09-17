import "reflect-metadata";
import express, { Request, Response } from "express";
import { DatabaseConnection } from "./data-source";
import { Produto } from "./entity/Produto";
import { Item } from "./entity/Item";

const app = express();
app.use(express.json());

// Inicialização do banco de dados
DatabaseConnection.initialize()
  .then(() => {
    // Rota para criar um novo produto
    app.post("/produtos", async (req: Request, res: Response) => {
      const { descricao, perecivel } = req.body;

      if (!descricao) {
        return res.status(400).json({ erro: "Um ou mais campos obrigatórios não foram enviados." });
      }

      const produto = new Produto();
      produto.descricao = descricao;
      produto.perecivel = perecivel ?? false;

      try {
        await DatabaseConnection.manager.save(produto);
        res.status(201).json(produto);
      } catch (erro) {
        res.status(400).json({ erro: "Erro ao salvar produto." });
      }
    });

    // Rota para criar um novo item
    app.post("/itens", async (req: Request, res: Response) => {
      const { quantidade, dataChegadaNoEstoque, produtoId } = req.body;

      if (!quantidade || !dataChegadaNoEstoque || !produtoId) {
        return res.status(400).json({ erro: "Um ou mais campos obrigatórios não foram enviados." });
      }

      const produto = await DatabaseConnection.manager.findOne(Produto, { where: { id: produtoId } });

      if (!produto) {
        return res.status(400).json({ erro: "Produto não encontrado." });
      }

      const item = new Item();
      item.quantidade = quantidade;
      item.dataChegadaNoEstoque = new Date(dataChegadaNoEstoque);
      item.produto = produto;

      try {
        await DatabaseConnection.manager.save(item);
        res.status(201).json(item);
      } catch (erro) {
        res.status(400).json({ erro: "Erro ao salvar item." });
      }
    });

    // Rota para obter itens por produto
    app.get("/itens/produto/:produtoId", async (req: Request, res: Response) => {
      const produtoId = parseInt(req.params.produtoId, 10);

      if (isNaN(produtoId)) {
        return res.status(400).json({ erro: "ID do produto inválido." });
      }

      const itens = await DatabaseConnection.manager.find(Item, { where: { produto: { id: produtoId } } });
      res.status(200).json(itens);
    });

    // Iniciando o servidor
    app.listen(3000, () => {
      console.log("Servidor rodando na porta 3000");
    });
  })
  .catch((erro) => console.error(erro));
