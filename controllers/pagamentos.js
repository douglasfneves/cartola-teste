module.exports = function(app) {
  app.get('/pagamentos', function(req, res){
    console.log('Requisição atendida com sucesso.');
    res.send('ok');
  });

  app.post('/pagamentos/pagamento', function(req, res){
    var pagamento = req.body;
    console.log(pagamento);
    res.send('OK man');
  });

}
