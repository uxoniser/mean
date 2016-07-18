(function() {
  "use strict";
  angular
    .module('products')
    .config(ProductsConfiguration);

  function ProductsConfiguration($routeProvider) {
   $routeProvider
   .when('/products', {
     templateUrl: 'views/products.html',
     controller: 'ProductsController',
     controllerAs: 'vm'
   })
   .when('/products/:id', {
     templateUrl: 'views/product.html',
     controller: 'ProductController',
     controllerAs: 'vm'
   });
  }
})();