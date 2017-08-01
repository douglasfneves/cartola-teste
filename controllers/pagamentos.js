module.exports = function(app) {
  app.get('/pagamentos', function(req, res){
    console.log('Requisição atendida com sucesso.');
    res.send('ok');
  });

  // app.post('/pagamentos/pagamento', function(req, res){
  //   var pagamento = req.body;
  //   console.log('processando uma requisição de um novo pagamento');

  //   pagamento.status = 'CRIADO';
  //   pagamento.data = new Date;

  //   var connection = app.persistencia.connectionFactory();
  //   var pagamentoDao = new app.persistencia.PagamentoDao(connection);

  //   pagamentoDao.salva(pagamento, function(erro, resultado){
  //     console.log('pagamento criado');
  //     res.json(pagamento);
  //   });

  // });

  app.post("/pagamentos/pagamento",function(req, res) {

    req.assert("forma_de_pagamento", "Forma de pagamento é obrigatório").notEmpty();
    req.assert("valor", "Valor é obrigatório e deve ser um decimal").notEmpty().isFloat();

    var erros = req.validationErrors(); //getValidationResult();

    if (erros) {
      console.log('Erros de validação encontrado');
      res.status(400).send(erros);
      return
    }

    var pagamento = req.body;
    console.log('processando pagamento...');

    var connection = app.persistencia.connectionFactory();
    var pagamentoDao = new app.persistencia.PagamentoDao(connection);

    pagamento.status = "CRIADO";
    pagamento.data = new Date;

    pagamentoDao.salva(pagamento, function(erro, resultado){
      if (erro) {
        console.log('Erro ao inserir no banco: ' + erro)
        res.status(500).send(erro);
      } else {
        console.log('pagamento criado: ' + resultado);
        res.location('/pagamentos/pagamento/' + resultado.insertId);

        res.status(201).json(pagamento);
      }
    });
  });

}
