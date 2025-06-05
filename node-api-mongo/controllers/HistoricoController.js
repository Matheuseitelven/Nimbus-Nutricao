// Importando as dependências
const mongoose = require("mongoose");

//Referencia o model Book
const Book = mongoose.model("Consulta");

// Vamos exportar um objeto com algumas funções
module.exports = {

    async index(req, res) {

        const { id } = req.params;

        // retorna os cursos de nosso banco de dados
        const books = await Book.find({ paciente_id: id });
        // vamos retornar em formato JSON
        return res.json(books);
    }

};