(function() {
  "use strict";
  angular
    .module("cart")
    .controller('CartController', CartController);

  CartController.$inject = ["CartService", "$location", "$route"];

  function CartController(CartService, $location, $route) {

    var vm = this;
    
    vm.loadProducts = loadProducts;
    vm.eliminarProducto = eliminarProducto;

    function eliminarProducto(productId){
      CartService.deleteProduct(productId)
      .then(function(data){
        if(data._id === productId)
          $route.reload();
      }, function(error){
        console.log("fallo el eliminar: ", error)
      })
    }

    function loadProducts() {
      CartService.getProducts()
        .then(function (data) {
          // promise fulfilled
          console.log(data);
          vm.productos = data;
        }, function (error) {
          // promise rejected, could log the error with: console.log('error', error);
          console.log(error);
        });
    }

  }
})();