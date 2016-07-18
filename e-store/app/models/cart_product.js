var mongoose = require('mongoose');

module.exports = function () {
    var container = this;
    container.schema = mongoose.Schema({
        _id: String,
        nombre: String,
        precio: Number,
        cantidadDisponible: Number,
        imagen: String,
    });
    container.model = mongoose.model('CartProduct', container.schema, 'cart_product');
}