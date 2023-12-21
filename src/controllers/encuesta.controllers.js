const encuestaCtrl = {};
const Respuestas = require("../models/encuesta");

encuestaCtrl.guardarEncuesta = async (req, res) => {
  let errors = [];
  const {
    nombre_del_encuestado,
    direccion,
    numero_telefono,
    email,
    composicion_hogar,
    edad_encuestado,
    nivel_educacion,
    instalarpaneles,
    utiliza_energia_solar,
    motivo_usar_paneles,
    frecuencia_mejoras_hogar,
    presupuesto_estimado_paneles,
    opciones_financiacion_paneles,
    experiencia_previa_paneles,
    como_se_enterode_los_paneles,
    pregunta_comentario,
  } = req.body;
  if (!nombre_del_encuestado) {
    errors.push({ text: "Ingrese su nombre" });
  }
  if (!direccion) {
    errors.push({ text: "Ingrese su direccion" });
  }
  if (!numero_telefono) {
    errors.push({ text: "Ingrese su telefono" });
  }
  if (!email) {
    errors.push({ text: "Ingrese su email" });
  }
  if (!composicion_hogar) {
    errors.push({ text: "Ingrese su composicion de su hogar" });
  }
  if (!edad_encuestado) {
    errors.push({ text: "Ingrese su edad" });
  }
  if (!nivel_educacion) {
    errors.push({ text: "Ingrese su nivel de educacion" });
  }
  if (!instalarpaneles) {
    errors.push({ text: "Inidque si quiere instalar paneles" });
  }
  if (!utiliza_energia_solar) {
    errors.push({ text: "Inidque si utiliza energia solar" });
  }
  if (!motivo_usar_paneles) {
    errors.push({ text: "Ingrese el motivo para usar paneles" });
  }
  if (!frecuencia_mejoras_hogar) {
    errors.push({ text: "Ingrese la frecuencia con la que mejora su hogar" });
  }
  if (!presupuesto_estimado_paneles) {
    errors.push({ text: "Ingrese el presupuesto estimado" });
  }
  if (!opciones_financiacion_paneles) {
    errors.push({ text: "Ingrese la opcion de financiamiento" });
  }
  if (!experiencia_previa_paneles) {
    errors.push({ text: "Indique si tuvo experiencia previa en paneles" });
  }
  if (!como_se_enterode_los_paneles) {
    errors.push({ text: "Ingrese como se entero de nosotros" });
  }
  if (!pregunta_comentario) {
    errors.push({ text: "Ingrese alguna pregunta o comentario" });
  }
  if (errors.length > 0) {
    res.render("encuesta", {
      errors,
      nombre_del_encuestado,
      direccion,
      numero_telefono,
      email,
      composicion_hogar,
      edad_encuestado,
      nivel_educacion,
      instalarpaneles,
      utiliza_energia_solar,
      motivo_usar_paneles,
      frecuencia_mejoras_hogar,
      presupuesto_estimado_paneles,
      opciones_financiacion_paneles,
      experiencia_previa_paneles,
      como_se_enterode_los_paneles,
      pregunta_comentario,
    });
  } else {
    // Look for email coincidence
    const emailUser = await Respuestas.findOne({ email: email });
    if (emailUser) {
      req.flash("error_msg", "El mail ya está registrado");
      res.redirect("/encuesta");
    } else {
      const newEncuesta = new Respuestas({
        nombre_del_encuestado,
        direccion,
        numero_telefono,
        email,
        composicion_hogar,
        edad_encuestado,
        nivel_educacion,
        instalarpaneles,
        utiliza_energia_solar,
        motivo_usar_paneles,
        frecuencia_mejoras_hogar,
        presupuesto_estimado_paneles,
        opciones_financiacion_paneles,
        experiencia_previa_paneles,
        como_se_enterode_los_paneles,
        pregunta_comentario,
      });
      await newEncuesta.save();
      req.flash(
        "success_msg",
        "Registro exitoso. ¡Muchas gracias por participar!"
      );
      res.redirect("/");
    }
  }
};


encuestaCtrl.mostrarResultados = async (req, res) => {
  try {
    // Contar la cantidad total de respuestas
    const totalRespuestas = await Respuestas.countDocuments();

    // Contar las respuestas para "instalarpaneles"
    const instalarPanelesRespuestas = await Respuestas.aggregate([
      { $group: { _id: "$instalarpaneles", count: { $sum: 1 } } }
    ]);

    // Calcular porcentajes para "instalarpaneles"
    const instalarPanelesSi = instalarPanelesRespuestas.find(resp => resp._id === 'si')?.count || 0;
    const instalarPanelesNo = instalarPanelesRespuestas.find(resp => resp._id === 'no')?.count || 0;
    const instalarPanelesNoSeguro = instalarPanelesRespuestas.find(resp => resp._id === 'no_seguro')?.count || 0;

    const porcentajeSiInstalarPaneles = parseFloat((instalarPanelesSi / totalRespuestas) * 100).toFixed(2);
    const porcentajeNoInstalarPaneles = parseFloat((instalarPanelesNo / totalRespuestas) * 100).toFixed(2);
    const porcentajeNoSeguroInstalarPaneles = parseFloat((instalarPanelesNoSeguro / totalRespuestas) * 100).toFixed(2);

    // Contar las respuestas para "utiliza_energia_solar"
    const utilizaEnergiaSolarRespuestas = await Respuestas.aggregate([
      { $group: { _id: "$utiliza_energia_solar", count: { $sum: 1 } } }
    ]);

    // Calcular porcentajes para "utiliza_energia_solar"
    const utilizaEnergiaSolarSi = utilizaEnergiaSolarRespuestas.find(resp => resp._id === 'si')?.count || 0;
    const utilizaEnergiaSolarNo = utilizaEnergiaSolarRespuestas.find(resp => resp._id === 'no')?.count || 0;
    const utilizaEnergiaSolarNoSeguro = utilizaEnergiaSolarRespuestas.find(resp => resp._id === 'no_seguro')?.count || 0;

    const porcentajeSiUtilizaEnergiaSolar = parseFloat((utilizaEnergiaSolarSi / totalRespuestas) * 100).toFixed(2);
    const porcentajeNoUtilizaEnergiaSolar = parseFloat((utilizaEnergiaSolarNo / totalRespuestas) * 100).toFixed(2);
    const porcentajeNoSeguroUtilizaEnergiaSolar = parseFloat((utilizaEnergiaSolarNoSeguro / totalRespuestas) * 100).toFixed(2);

    // Imprimir porcentajes por consola
    console.log(`Total de respuestas: ${totalRespuestas}`);
    console.log(`Porcentaje que desea instalar paneles: ${porcentajeSiInstalarPaneles}%`);
    console.log(`Porcentaje que no desea instalar paneles: ${porcentajeNoInstalarPaneles}%`);
    console.log(`Porcentaje no seguro sobre instalar paneles: ${porcentajeNoSeguroInstalarPaneles}%`);
    console.log(`Porcentaje que utiliza energía solar: ${porcentajeSiUtilizaEnergiaSolar}%`);
    console.log(`Porcentaje que no utiliza energía solar: ${porcentajeNoUtilizaEnergiaSolar}%`);
    console.log(`Porcentaje no seguro sobre utilizar energía solar: ${porcentajeNoSeguroUtilizaEnergiaSolar}%`);

    res.render('index', {
      totalRespuestas,
      porcentajeSiInstalarPaneles,
      porcentajeNoInstalarPaneles,
      porcentajeNoSeguroInstalarPaneles,
      porcentajeSiUtilizaEnergiaSolar,
      porcentajeNoUtilizaEnergiaSolar,
      porcentajeNoSeguroUtilizaEnergiaSolar
    });
  } catch (error) {
    console.error("Error al obtener resultados:", error);
    res.status(500).json({ error: "Error al obtener resultados" });
  }
};


module.exports = encuestaCtrl;