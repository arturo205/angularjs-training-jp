'use strict';

/* Controllers */

var phonecatControllers = angular.module('phonecatControllers', []);

phonecatControllers.controller('PhoneListCtrl', ['$scope', 'DeviceManager',
  function($scope, DeviceManager) {
    $scope.phones = DeviceManager.getAllPhones();
    $scope.orderProp = 'name';
  }]);

phonecatControllers.controller('PhoneDetailCtrl', ['$scope', '$routeParams', 'Phone',
  function($scope, $routeParams, Phone) {
    $scope.phone = Phone.get({phoneId: $routeParams.phoneId}, function(phone) {
      $scope.mainImageUrl = phone.images[0];
    });
    $scope.setImage = function(imageUrl) {
      $scope.mainImageUrl = imageUrl;
    };
  }]);

phonecatControllers.controller('PhoneAddCtrl', ['$scope', 'DeviceManager',
  function($scope, DeviceManager) {
    $scope.addNewPhone = function($scope) {
      DeviceManager.addPhone({id: $scope.id, name: $scope.name, snippet: $scope.snippet, 
                              age: $scope.age, imageUrl: 'img/phones/motorola-atrix-4g.0.jpg'});
    };
  }]);
  
phonecatControllers.controller('PhoneEditCtrl', ['$scope', '$routeParams', 'DeviceManager',
  function($scope, $routeParams, DeviceManager) {
    var selectedPhone = DeviceManager.findPhoneById($routeParams.phoneId);
    if (selectedPhone === undefined || selectedPhone === null) {
      selectedPhone = {id: 'Not Found! Please go back and select one phone.', name: '', 
                       snippet: '', age: '', imageUrl: 'img/phones/motorola-atrix-4g.0.jpg'};
    }
    $scope.phoneId = selectedPhone.id;
    $scope.name = selectedPhone.name;
    $scope.snippet = selectedPhone.snippet;
    $scope.age = selectedPhone.age;
    $scope.image = selectedPhone.imageUrl;
    
    $scope.editPhone = function($scope) {
      DeviceManager.savePhone({id: selectedPhone.id, name: $scope.name, snippet: $scope.snippet, 
                               age: $scope.age, imageUrl: selectedPhone.imageUrl});
    };
  }]);
  
phonecatControllers.controller('PhoneDeleteCtrl', ['$routeParams', '$location', 'DeviceManager',
  function($routeParams, $location, DeviceManager) {
    DeviceManager.deletePhone($routeParams.phoneId);
    $location.path('/phones');
  }]);