var mongoose = require('mongoose');
var Review = require("./review");

var review = new Review();

module.exports = function () {
    var container = this;
    container.schema = mongoose.Schema({
        nombre: String,
        precio: Number,
        cantidadDisponible: Number,
        descripcion: String,
        imagen: String,
        reviews: [review.schema]
    });
    container.model = mongoose.model('Product', container.schema, 'product');
}