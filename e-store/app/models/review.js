var mongoose = require('mongoose');

module.exports = function () {
    var container = this;
    container.schema = mongoose.Schema({
        titulo: String,
        descripcion: String,
        email: String
    });
    container.model = mongoose.model('Review', container.schema, 'review')
};