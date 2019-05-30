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
            res.status(200).json(result);
            console.log('Clientes listados com sucesso');
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

        var connection = app.persistencia.connectionFactory();
        var clienteDao = new app.persistencia.ClienteDao(connection);

        cliente.date = new Date(cliente.date).toLocaleString();

        clienteDao.atualiza(id, cliente, function(erro){
            if (erro){
                res.status(500).send(erro);
                return;
            }
            console.log('cliente alterado');
            res.status(204).send(cliente);
        });
    });

    app.get('/buscar/:nome', function(req, res){
        var nome = req.params.nome;

        if (!nome){
            return;
        }

        var connection = app.persistencia.connectionFactory();
        var clienteDao = new app.persistencia.ClienteDao(connection);

        clienteDao.buscaPorNome(nome, function(erro,result){

            if (result.length >= 1) {
                console.log('resultado da busca:');
                console.log(result);
                res.status(200).json(result);
            } else {
                console.log('nenhum resultado encontrado');
                res.status(404).send(erro);
                return;

            }
        });
    });

    app.delete('/deletar/:nome', function(req, res){
        var nome = req.params.nome;

        if (!nome){
            return;
        }
        var connection = app.persistencia.connectionFactory();
        var clienteDao = new app.persistencia.ClienteDao(connection);

        clienteDao.deleta(nome, function(erro,result){
            console.log(result);
            if (result.length < 1){
                console.log('nenhum resultado encontrado');
                res.status(404).send(erro);
                return;
            }else{
                console.log('cliente excluido');
                res.status(200);
            }
        });
    });
};
