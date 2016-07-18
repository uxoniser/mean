var productModule = require('./models/product');
var cartProductModule = require('./models/cart_product');

var Product = new productModule();
var CartProduct = new cartProductModule();

module.exports = function (app) {

    // api ---------------------------------------------------------------------
    app.get('/api/products', function (request, response) {
        Product.model.
            find().
            select("_id nombre precio cantidadDisponible imagen").
            exec(function (err, products) {
                if (err)
                    response.send(err);
                response.json(products);
            });
    });
    app.get('/api/products/:productId', function (request, response) {
        Product.model.
            findOne().
            where('_id').
            equals(request.params.productId).
            limit(1).
            exec(function (err, product) {
                if (err)
                    response.send(err);
                response.json(product);
            });
    });

    app.post("/api/cart-products", function (request, response) {
        var productId = request.body._id;
        CartProduct.model.
            findOne().
            where("_id").
            equals(productId).
            limit(1).
            select("_id cantidadDisponible").
            exec(function (err, cartProduct) {
                if (err) {
                    console.log("fallo buscando en el carrito: ", err);
                    response.send(err);
                }
                else {
                    if (cartProduct) {
                        CartProduct.model.
                            update(
                            { _id: cartProduct._id },
                            { cantidadDisponible: cartProduct.cantidadDisponible + 1 },
                            function (err, raw) {
                                if (err) {
                                    console.log("fallo update carrito: ", err);
                                    response.send(err);
                                }
                                Product.model.
                                    findOne().
                                    where("_id").
                                    equals(cartProduct._id).
                                    select("_id cantidadDisponible").
                                    limit(1).
                                    exec(function (err, product) {
                                        if (err) {
                                            console.log("get producto en catalogo: ", err);
                                            response.send(err);
                                        }
                                        Product.model.
                                            update(
                                            { _id: product._id },
                                            { cantidadDisponible: product.cantidadDisponible - 1 },
                                            function (err, raw) {
                                                if (err) {
                                                    console.log("fallo update catalogo: ", err);
                                                    response.send(err);
                                                }
                                                response.json(raw);
                                            });
                                    });
                            });
                    }
                    else {
                        Product.model.
                            findOne().
                            where("_id").
                            equals(productId).
                            select("_id nombre precio cantidadDisponible imagen").
                            limit(1).
                            exec(function (err, product) {
                                if (err) {
                                    console.log("get producto en catalogo: ", err);
                                    response.send(err);
                                }

                                Product.model.
                                    update(
                                    { _id: product._id },
                                    { cantidadDisponible: product.cantidadDisponible - 1 },
                                    function (err, raw) {
                                        if (err) {
                                            console.log("fallo update catalogo: ", err);
                                            response.send(err);
                                        }
                                        var newProduct = new CartProduct.model();
                                        newProduct._id = product._id;
                                        newProduct.cantidadDisponible = 1;
                                        newProduct.precio = product.precio;
                                        newProduct.imagen = product.imagen;

                                        newProduct.save(function (err, saved) {
                                            if (err)
                                                return console.error("fallo el save: ", err);
                                            response.json(saved);
                                        });
                                    });
                            });
                    }
                }
            });
    });

    // create todo and send back all todos after creation
    app.put('/api/products/:productId/reviews', function (request, response) {
        var product = request.body;
        Product.model.
            update(
            { _id: product._id },
            { reviews: product.reviews },
            function (err, raw) {
                if (err) {
                    console.log("fallo update review: ", err);
                    response.send(err);
                }
                console.log("respuesta update", raw);
                response.json(raw);
            });
    });

    app.get('/api/cart-products', function (request, response) {
        CartProduct.model.
            find().
            select("_id nombre precio cantidadDisponible imagen").
            exec(function (err, products) {
                if (err)
                    response.send(err);
                response.json(products);
            });
    });

    // delete a todo
    app.delete('/api/cart-products/:productId', function (request, response) {
        CartProduct.model.
            findByIdAndRemove(request.params.productId, function (err, product) {
                if (err) {
                    console.log("fallo el delete ", err)
                    response.send(err);
                }
                response.json(product);
            })
    });

    // application -------------------------------------------------------------
    // app.get('*', function (request, response) {
    //     console.log(__dirname);
    //     response.sendFile('/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    // });

};