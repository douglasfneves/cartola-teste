module.exports = function(app) {
  app.get('/teste', function(req, res){
    console.log('Requisição atendida com sucesso.');
    res.send('ok teste');
  });
}