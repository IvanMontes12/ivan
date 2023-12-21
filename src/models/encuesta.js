const { Schema, model } = require("mongoose");

const encuestaSchema = new Schema({
  nombre_del_encuestado: { type: String, require: true },
  direccion: { type: String, require: true },
  numero_telefono : { type: Number, require: true },
  email: { type: String, require: true },
  composicion_hogar : { type: String, require: true },
  edad_encuestado: { type: String, require: true },
  nivel_educacion: { type: String, require: true },
  instalarpaneles: { type: String, require: true },
  utiliza_energia_solar: { type: String, require: true },
  motivo_usar_paneles: { type: String, require: true },
  frecuencia_mejoras_hogar: { type: String, require: true },
  presupuesto_estimado_paneles: { type: String, require: true },
  opciones_financiacion_paneles: { type: String, require: true },
  experiencia_previa_paneles: { type: String, require: true },
  como_se_enterode_los_paneles: { type: String, require: true },
  pregunta_comentario: { type: String, require: true },
});

module.exports = model("Encuesta", encuestaSchema);
