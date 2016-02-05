'use strict';

/* Controllers */

var phonecatControllers = angular.module('phonecatControllers', []);
var allPhones = [];
var myPhone = null;
var initializeFlag = true;

phonecatControllers.controller('PhoneListCtrl', ['$scope', 'Phone',
  function($scope, Phone) {
    var tempPhone = null;
    if (initializeFlag) {
      $scope.phones = Phone.query(function() {
        for (var i=0; i<$scope.phones.length; i++) {
          tempPhone = {id: $scope.phones[i].id, name: $scope.phones[i].name, 
                       snippet: $scope.phones[i].snippet, age: $scope.phones[i].age, 
                       imageUrl: $scope.phones[i].imageUrl};
          allPhones.push(tempPhone);
        }
        $scope.phones = allPhones;
      });
      initializeFlag = false;
    }
    else {
      $scope.phones = allPhones;
    }
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

phonecatControllers.controller('PhoneAddCtrl', ['$scope',
  function($scope) {
    $scope.addNewPhone = function($scope) {
      myPhone = {id: $scope.id, name: $scope.name, snippet: $scope.snippet, 
                 age: $scope.age, imageUrl: 'img/phones/motorola-atrix-4g.0.jpg'};
      allPhones.push(myPhone);
    };
  }]);
  
phonecatControllers.controller('PhoneEditCtrl', ['$scope', '$routeParams',
  function($scope, $routeParams) {
    for(var i = 0; i < allPhones.length; i++) {
      if (allPhones[i].id == $routeParams.phoneId) {
        myPhone = allPhones[i];
        break;
      }
    }
    
    if (myPhone === undefined || myPhone === null) {
      myPhone = {id: 'Not Found! Please go back and select one phone.', name: '', 
                 snippet: '', age: '', imageUrl: 'img/phones/motorola-atrix-4g.0.jpg'};
    }
    
    $scope.phoneId = myPhone.id;
    $scope.name = myPhone.name;
    $scope.snippet = myPhone.snippet;
    $scope.age = myPhone.age;
    $scope.image = myPhone.imageUrl;
    
    $scope.editPhone = function($scope, Phone) {
      allPhones[allPhones.indexOf(myPhone)].name = $scope.name;
      allPhones[allPhones.indexOf(myPhone)].snippet = $scope.snippet;
      allPhones[allPhones.indexOf(myPhone)].age = $scope.age;
    };
  }]);
  
phonecatControllers.controller('PhoneDeleteCtrl', ['$routeParams', '$location',
  function($routeParams, $location) {
    for(var i = 0; i < allPhones.length; i++) {
      if (allPhones[i].id == $routeParams.phoneId) {
        allPhones.splice(i,1);
        break;
      }
    }
    $location.path('/phones');
  }]);
