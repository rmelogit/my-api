function ClienteDao(connection) {
    this._connection = connection;
}

ClienteDao.prototype.salva = function(cliente, callback) {
    this._connection.query('INSERT INTO clientes SET ?', cliente, callback);
};

ClienteDao.prototype.atualiza = function(id, cliente, callback) {
    this._connection.query('UPDATE clientes SET ? where id = ?', [cliente, id], callback);
};

ClienteDao.prototype.deleta = function(id, callback) {
    this._connection.query('DELETE FROM clientes where id = ?', [id], callback);
};

ClienteDao.prototype.lista = function(callback) {
    this._connection.query('select * from clientes',callback);
};

ClienteDao.prototype.buscaPorId = function (id, callback) {
    this._connection.query("select * from clientes where id = ?",[id],callback);
};

module.exports = function(){
    return ClienteDao;
};
