// Importar módulos necessários
const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

// Define o schema do Curso
const ConsultaSchema = new mongoose.Schema({
  paciente_id: {
    type: String,
    required: true,
  },
  dieta: {
    type: String,
    required: false,
  },
  data_consulta: {
    type: Date,
    required: true,
  },
  finalizada: {
    type: Boolean,
    required: true,
  },
  peso: {
    type: String,
    required: false,
  },
  altura: {
    type: String,
    required: false,
  },
  imc: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Adiciona o plugin mongoosePaginate em nosso schema
ConsultaSchema.plugin(mongoosePaginate);

// Registra o model Book em nossa aplicação informando seu schema
mongoose.model("Consulta", ConsultaSchema);