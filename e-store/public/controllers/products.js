(function () {
  "use strict";
  angular
    .module("products")
    .controller('ProductsController', ProductsController);

  ProductsController.$inject = ["ProductsService", "$location"];

  function ProductsController(ProductsService, $location) {

    var vm = this;

    vm.loadProducts = loadProducts;
    vm.verDetalle = verDetalle;

    function loadProducts() {
      ProductsService.getProducts()
        .then(function (data) {
          // promise fulfilled
          console.log(data);
          vm.productos = data;
        }, function (error) {
          // promise rejected, could log the error with: console.log('error', error);
          console.log(error);
        });
    }

    function verDetalle(id) {
      $location.path("/products/" + id);
    }
  }
})();