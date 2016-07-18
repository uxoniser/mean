(function () {
  "use strict";
  angular
    .module("products")
    .directive('addReview', addReview);

  function addReview() {

    var directive = {
      restriction: "E",
      templateUrl: "directives/views/add-review.html",
      controller: AddReviewController,
      controllerAs: "vm",
      scope: {
        producto: "=",
        servicecall: "="
      },
      bindToController: true
    };

    return directive;
  }

  function AddReviewController() {
    var vm = this;

    vm.newReview = {};
    vm.addNewReview = addNewReview;
    vm.isErrorRequired = isErrorRequired;
    vm.isErrorEmail = isErrorEmail;

    function addNewReview(form) {
      console.log("entre add review controller");
      console.log(vm.producto);
      console.log(vm.servicecall);

      vm.producto.reviews.push(vm.newReview);
      vm.servicecall(vm.producto).
        then(function (data) {
          vm.addedReview = data;
          if (!vm.addedReview.ok) {
            console.log("respuesta mala del servicio de review: ", vm.addedReview);
            vm.producto.reviews.pop();
          }
          console.log("respuesta buena del servicio de review: ", vm.addedReview);
          form.$setPristine();
          form.$setUntouched();
          vm.newReview = {};
        },
        function (error) {
          console.log(error);
        });
    }

    function isErrorRequired(field) {
      return field.$error.required && (field.$touched || field.$$parentForm.$submitted);
    }

    function isErrorEmail(field) {
      return field.$error.email && (field.$touched || field.$$parentForm.$submitted);
    }

  }
})();