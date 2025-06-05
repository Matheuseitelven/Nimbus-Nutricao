// Importar módulos necessários
const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

// Define o schema do Curso
const AcessoSchema = new mongoose.Schema({
  paciente_id: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  senha: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Adiciona o plugin mongoosePaginate em nosso schema
AcessoSchema.plugin(mongoosePaginate);

// Registra o model Book em nossa aplicação informando seu schema
mongoose.model("Acesso", AcessoSchema);