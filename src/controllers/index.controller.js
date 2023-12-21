const indexCtrl = {};

indexCtrl.renderAbout = (req, res) => {
  res.render('about');
}; 
indexCtrl.renderinformacion = (req, res) => {
    res.render('masinformacion');
};

indexCtrl.renderencuesta = (req, res) => {
  res.render('encuesta');
};

module.exports = indexCtrl;