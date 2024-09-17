describe("Testes da API", () => {
  it("Deve criar um novo produto", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:3000/produtos",
      body: {
        descricao: "Produto Exemplo",
        perecivel: false,
      },
    }).then((resposta) => {
      expect(resposta.status).to.equal(201);
      expect(resposta.body.descricao).to.equal("Produto Exemplo");
    });
  });

  it("Deve retornar erro ao tentar criar produto sem campos obrigatórios", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:3000/produtos",
      body: {
        perecivel: false,
      },
      failOnStatusCode: false,
    }).then((resposta) => {
      expect(resposta.status).to.equal(400);
      expect(resposta.body.erro).to.equal("Um ou mais campos obrigatórios não foram enviados.");
    });
  });

  it("Deve criar um novo item", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:3000/produtos",
      body: {
        descricao: "Produto Exemplo 2",
      },
    }).then((resposta) => {
      const produtoId = resposta.body.id;

      cy.request({
        method: "POST",
        url: "http://localhost:3000/itens",
        body: {
          quantidade: 10,
          dataChegadaNoEstoque: "2024-09-12",
          produtoId: produtoId,
        },
      }).then((resposta) => {
        expect(resposta.status).to.equal(201);
        expect(resposta.body.quantidade).to.equal(10);
      });
    });
  });

  it("Deve retornar erro ao tentar criar item sem campos obrigatórios", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:3000/itens",
      body: {
        dataChegadaNoEstoque: "2024-09-12",
      },
      failOnStatusCode: false,
    }).then((resposta) => {
      expect(resposta.status).to.equal(400);
      expect(resposta.body.erro).to.equal("Um ou mais campos obrigatórios não foram enviados.");
    });
  });

  it("Deve listar todos os itens de um produto", () => {
    cy.request("GET", "http://localhost:3000/itens/produto/1").then((resposta) => {
      expect(resposta.status).to.equal(200);
    });
  });
});
