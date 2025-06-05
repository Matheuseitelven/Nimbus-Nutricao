// Importando as dependências
const mongoose = require("mongoose");

//Referencia o model Book
const Book = mongoose.model("Consulta");

// Vamos exportar um objeto com algumas funções
module.exports = {

    async index(req, res) {
        // retorna os cursos de nosso banco de dados
        const books = await Book.find();
        // vamos retornar em formato JSON
        return res.json(books);
    },
    async store(req, res) {

        const book = await Book.create(req.body);
        
        // Vamos retornar o curso que criamos
        return res.json(book);

    },
    async show(req, res) {
        
        const book = await Book.findById(req.params.id);
        
        // Vamos retornar o book que encontramos
        return res.json(book);

    },
    async update(req, res) {

        // procura um curso pelo ID e atualiza ele
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });

        // Vamos retornar o curso que encontramos
        return res.json(book);

    },
    async delete(req, res) {

        await Book.findByIdAndDelete(req.params.id);

        // Vamos retornar uma mensagem de sucesso sem conteúdo
        return res.send({ msg: "Registro apagado com sucesso!" });

    },

};