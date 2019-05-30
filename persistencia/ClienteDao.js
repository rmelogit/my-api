function ClienteDao(connection) {
    this._connection = connection;
}

ClienteDao.prototype.salva = function(cliente, callback) {
    this._connection.query('INSERT INTO clientes SET ?', cliente, callback);
};

ClienteDao.prototype.atualiza = function(id, cliente, callback) {
    this._connection.query('UPDATE clientes SET nome = ?, sobrenome = ?, data = ?, sexo = ? where id = ?', [cliente.nome, cliente.sobrenome, cliente.data, cliente.sexo, id], callback);
};

ClienteDao.prototype.deleta = function(nome, callback) {
    this._connection.query('DELETE FROM clientes where nome = ?', [nome], callback);
};

ClienteDao.prototype.lista = function(callback) {
    this._connection.query('SELECT * FROM clientes',callback);
};

ClienteDao.prototype.buscaPorNome = function (nome, callback) {
    this._connection.query("select * from clientes where nome = ?",[nome],callback);
};

module.exports = function(){
    return ClienteDao;
};
