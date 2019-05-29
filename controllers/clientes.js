module.exports = function(app){

    app.get('/', function(req, res) {
        console.log('Recebida requisicao de teste na porta 3000.');
        res.send('OK!');
    });

    app.get('/listar', function (req, res) {
        console.log('Listando os clientes cadastrados');

        var connection = app.persistencia.connectionFactory();
        var clienteDao = new app.persistencia.ClienteDao(connection);

        clienteDao.lista(function (exception, result) {
            console.log(result);
            console.log('Clientes listados com sucesso');
            res.json(result);
        });
    });

    app.post("/cadastrar",function(req, res) {
        var cliente = req.body;
        console.log('processando o cadastro... '+ cliente);

        var connection = app.persistencia.connectionFactory();
        var clienteDao = new app.persistencia.ClienteDao(connection);

        clienteDao.salva(cliente,function (exception, result) {
            cliente.id = result.insertId;
            console.log('Cliente Criado com Sucesso: ' + result.insertId);
            res.status(201).json(cliente);
        });
    });

    app.put('/alterar/:id', function(req, res){
        var cliente = req.body;
        var id = req.params.id;

        console.log("ID: "+id);
        console.log("cliente: "+ cliente);

        var connection = app.persistencia.connectionFactory();
        var clienteDao = new app.persistencia.ClienteDao(connection);

        cliente.date = new Date(cliente.date).toLocaleString()

        clienteDao.atualiza(id, cliente, function(erro){
            if (erro){
                res.status(404).send(erro);
                return;
            }
            console.log('cliente alterado');
            res.status(204).send(cliente);
        });
    });

    app.delete('/deletar/:id', function(req, res){
        var id = req.params.id;

        console.log("Processo de exclusão iniciado para: "+id);

        var connection = app.persistencia.connectionFactory();
        var clienteDao = new app.persistencia.ClienteDao(connection);

        clienteDao.deleta(id, function(erro){
            if (erro){
                res.status(500).send(erro);
                return;
            }
            console.log('cliente excluido');
            res.status(200);
        });
    });
};
