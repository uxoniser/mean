(function() {
  "use strict";
  angular
    .module('e-store')
    .config(MainConfiguration);

  function MainConfiguration($routeProvider, $locationProvider) {
   $routeProvider
   .when('/', {
     templateUrl: 'views/home.html',
     controller: 'MainController',
     controllerAs: 'vm'
   })
   .when('/notfound', {
     templateUrl: 'views/notfound.html',
     controller: 'MainController',
     controllerAs: 'vm'
   })
   .otherwise({
     redirectTo: "/notfound"
   });
   
   // $locationProvider.html5Mode({
     //  enabled: true,
      // requireBase: false
     //});
  }
})();