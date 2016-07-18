(function() {
  "use strict";
  angular
    .module("e-store")
    .controller('MainController', MainController);

  MainController.$inject = ["$location"];

  function MainController($location) {

    var vm = this;
    vm.isActiveUrl = isActiveUrl;
    vm.isNotFound = isNotFound;
    
    
    function isActiveUrl(path){
      return $location.path() === path;
    }
    
    function isNotFound(){
      return $location.path() === "/notfound";
    }
  }
})();