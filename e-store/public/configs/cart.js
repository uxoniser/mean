(function() {
  "use strict";
  angular
    .module('cart')
    .config(CartConfiguration);

  function CartConfiguration($routeProvider) {
   $routeProvider
   .when('/mycart', {
     templateUrl: 'views/cart.html',
     controller: 'CartController',
     controllerAs: 'vm'
   })
  }
})();