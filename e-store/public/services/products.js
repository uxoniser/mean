(function () {
  "use strict";

  angular
    .module("products")
    .factory("ProductsService", ProductsService);

  ProductsService.$inject = ["$http", "$q"];

  function ProductsService($http, $q) {

    var factory = {};

    factory.addReview = addReview;
    factory.getProducts = getProducts;
    factory.getProductById = getProductById;

    function addReview(product){
      console.log("entre al servicio addreview con: ", product);
      return $http.put("/api/products/" + product._id + "/reviews", product)
        .then(addReviewSuccess)
        .catch(addReviewFailed);

      function addReviewSuccess(response) {
        if (typeof response.data === 'object') {
          return response.data;
        } else {
          return $q.reject(response.data);
        }
      }

      function addReviewFailed(e) {
        console.log("addReviewFailed: ", e);
        return $q.reject(e);
      }

    }

    function getProducts() {
      return $http.get('/api/products')
        .then(getProductsSuccess)
        .catch(getProductsFailed);

      function getProductsSuccess(response) {
        if (typeof response.data === 'object') {
          return response.data;
        } else {
          return $q.reject(response.data);
        }
      }

      function getProductsFailed(e) {
        console.log("getProductsFailed: ", e);
        return $q.reject(e);
      }
    }



    function getProductById(productId) {
      return $http.get('/api/products/' + productId)
        .then(getProductSuccess)
        .catch(getProductFailed);

      function getProductSuccess(response) {
        if (typeof response.data === 'object') {
          return response.data;
        } else {
          return $q.reject(response.data);
        }
      }

      function getProductFailed(e) {
        console.log("getProductFailed: ", e);
        return $q.reject(e);
      }
    }

    return factory;
  }
})();