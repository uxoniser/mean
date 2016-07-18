(function () {
  "use strict";

  angular
    .module("cart")
    .factory("CartService", CartService);

  CartService.$inject = ["$http", "$q"];

  function CartService($http, $q) {

    var factory = {};

    factory.addProduct = addProduct;
    factory.getProducts = getProducts;
    factory.deleteProduct = deleteProduct;

    function addProduct(productId) {
      return $http.post('/api/cart-products', { "_id": productId })
        .then(addProductSuccess)
        .catch(addProductFailed);

      function addProductSuccess(response) {
        console.log("add product service response: ", response);
        if (response.status === 200) {
          return response.data;
        } else {
          return $q.reject(response.data);
        }
      }

      function addProductFailed(e) {
        console.log("getProductFailed", e);
        return $q.reject(e);
      }
    }

    function getProducts() {
      return $http.get('/api/cart-products')
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

    function deleteProduct(productId){
      return $http.delete('/api/cart-products/' + productId)
        .then(deleteProductsSuccess)
        .catch(deleteProductsFailed);

      function deleteProductsSuccess(response) {
        console.log("respuesta del servicio deleteProductsSuccess: ", response)
        if (response.statusText === "OK") {
          return response.data;
        } else {
          return $q.reject(response.data);
        }
      }

      function deleteProductsFailed(e) {
        console.log("deleteProductsFailed: ", e);
        return $q.reject(e);
      }
    }

    return factory;
  }































})();