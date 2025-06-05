// Importar módulos necessários
const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

// Define o schema do Curso
const PacienteSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  observacao: {
    type: String,
    required: false,
  },
  idade: {
    type: Number,
    required: true,
  },
  sexo: {
    type: String,
    required: true,
  },
  telefone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: false,
  },
  senha: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  
});

// Adiciona o plugin mongoosePaginate em nosso schema
PacienteSchema.plugin(mongoosePaginate);

// Registra o model Book em nossa aplicação informando seu schema
mongoose.model("Paciente", PacienteSchema);