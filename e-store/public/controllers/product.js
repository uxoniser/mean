(function () {
  "use strict";
  angular
    .module("products")
    .controller('ProductController', ProductController);

  ProductController.$inject = ["ProductsService", "CartService", "$location", "$routeParams"];

  function ProductController(ProductsService, CartService, $location, $routeParams) {

    var vm = this;

    vm.getProductById = getProductById;
    vm.addReViewServiceCall = ProductsService.addReview;
    vm.addProduct = addProduct;

    function addProduct() {
      CartService.addProduct(vm.producto._id).
        then(function (data) {
          console.log("resultado de añadir producto controller: ", data)
          vm.addedProduct = data;
          if (!vm.addedProduct) {
            $location.path("/notfound");
          }
          else {
            alert("Producto añadido");
            $location.path("/products");
          }
        },
        function (error) {
          console.log(error);
        });
    }

    function getProductById() {
      ProductsService.getProductById($routeParams.id)
        .then(function (data) {
          vm.producto = data;
          if (!vm.producto) {
            $location.path("/notfound");
          }
        }, function (error) {
          console.log(error);
          $location.path("/notfound");
        });
    }
  }
})();