// Importando as dependências
const mongoose = require("mongoose");

//Referencia o model Book
const Book = mongoose.model("Acesso");

// Vamos exportar um objeto com algumas funções
module.exports = {

    async index(req, res) {

        const { email, senha } = req.body;

        // retorna os cursos de nosso banco de dados
        const books = await Book.findOne({ email: email, senha: senha });
        // vamos retornar em formato JSON
        return res.json(books);
    }

};