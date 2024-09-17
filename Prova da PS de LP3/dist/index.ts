"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator"throw"); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const data_source_1 = require("./data-source");
const Produto_1 = require("./entity/Produto");
const Item_1 = require("./entity/Item");

const app = (0, express_1.default)();
app.use(express_1.default.json());

// Inicializando a conexão com o banco de dados
data_source_1.AppDataSource.initialize()
    .then(() => {
        // Rota para criar um novo produto
        app.post("/produtos", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
            const { descricao, perecivel } = req.body;
            if (!descricao) {
                return res.status(400).json({ erro: "Um ou mais campos obrigatórios não foram enviados." });
            }
            const novoProduto = new Produto_1.Produto();
            novoProduto.descricao = descricao;
            novoProduto.perecivel = perecivel || false;
            try {
                yield data_source_1.AppDataSource.manager.save(novoProduto);
                res.status(201).json(novoProduto);
            } catch (erro) {
                res.status(400).json({ erro: "Erro ao salvar produto." });
            }
        }));

        // Rota para criar um novo item
        app.post("/itens", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
            const { quantidade, dataChegadaNoEstoque, produtoId } = req.body;
            if (!quantidade || !dataChegadaNoEstoque || !produtoId) {
                return res.status(400).json({ erro: "Um ou mais campos obrigatórios não foram enviados." });
            }
            const produtoExistente = yield data_source_1.AppDataSource.manager.findOne(Produto_1.Produto, { where: { id: produtoId } });
            if (!produtoExistente) {
                return res.status(400).json({ erro: "Produto não encontrado." });
            }
            const novoItem = new Item_1.Item();
            novoItem.quantidade = quantidade;
            novoItem.dataChegadaNoEstoque = dataChegadaNoEstoque;
            novoItem.produto = produtoExistente;
            try {
                yield data_source_1.AppDataSource.manager.save(novoItem);
                res.status(201).json(novoItem);
            } catch (erro) {
                res.status(400).json({ erro: "Erro ao salvar item." });
            }
        }));

        // Rota para obter itens por produto
        app.get("/itens/produto/:produtoId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
            const produtoId = parseInt(req.params.produtoId, 10);
            if (isNaN(produtoId)) {
                return res.status(400).json({ erro: "ID do produto inválido." });
            }
            const itens = yield data_source_1.AppDataSource.manager.find(Item_1.Item, { where: { produto: { id: produtoId } } });
            res.status(200).json(itens);
        }));

        // Iniciando o servidor
        app.listen(3000, () => {
            console.log("Servidor rodando na porta 3000");
        });
    })
    .catch((erro) => console.error(erro));
