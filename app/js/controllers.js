'use strict';

/* Controllers */

var phonecatControllers = angular.module('phonecatControllers', []);
var allPhones = [];
var myPhone = null;
var initializeFlag = true;

phonecatControllers.controller('PhoneListCtrl', ['$scope', 'Phone',
  function($scope, Phone) {
    
    console.log('Entered the add PhoneListCtrl controller.');
    
    if (initializeFlag) {
      $scope.phones = Phone.query(function() {
        console.log('Number of phones in JSON file: ' + $scope.phones.length);
        for (var i=0; i<$scope.phones.length; i++) {
          var tempPhone = {id: $scope.phones[i].id, name: $scope.phones[i].name, snippet: $scope.phones[i].snippet, age: $scope.phones[i].age, imageUrl: $scope.phones[i].imageUrl};
          allPhones.push(tempPhone);
        }
        $scope.phones = allPhones;
      });
      initializeFlag = false;
    }
    else {
      $scope.phones = allPhones;
    }
    
    $scope.orderProp = 'age';
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

phonecatControllers.controller('PhoneAddCtrl', ['$scope', 'Phone',
  function($scope, Phone) {
    
    console.log('Entered the PhoneAddCtrl controller.');
    console.log('List of all phones created so far:');
    console.log(allPhones);
    
    $scope.addNewPhone = function($scope, Phone) {
      
      console.log('A new phone will be added.');
      
      myPhone = {id: $scope.id, name: $scope.name, snippet: $scope.snippet, age: $scope.age, imageUrl: 'img/phones/motorola-atrix-4g.0.jpg'};
      
      allPhones.push(myPhone);
      
      console.log('Phone that was added: ' + allPhones[allPhones.indexOf(myPhone)].name);
      console.log('A new phone was added to the list!.');
      console.log('Number of phones in the list: ' + allPhones.length);
      console.log('List of all phones created so far:');
      console.log(allPhones);
    };
  }]);
  
phonecatControllers.controller('PhoneEditCtrl', ['$scope', '$routeParams', 'Phone',
  function($scope, $routeParams, Phone) {
    
    console.log('Entered the PhoneEditCtrl controller.');
    
    for(var i = 0; i < allPhones.length; i++) {
      if (allPhones[i].id == $routeParams.phoneId) {
        myPhone = allPhones[i];
        break;
      }
    }
    
    if (myPhone === undefined || myPhone === null) {
      myPhone = {id: 'Not Found! Please go back and select one phone.', name: '', snippet: '', age: '', imageUrl: 'img/phones/motorola-atrix-4g.0.jpg'};
    }
    
    console.log('Phone that will be edited:');
    console.log(myPhone);
    
    $scope.phoneId = myPhone.id;
    $scope.name = myPhone.name;
    $scope.snippet = myPhone.snippet;
    $scope.age = myPhone.age;
    $scope.image = myPhone.imageUrl;
    
    $scope.editPhone = function($scope, Phone) {
      
      allPhones[allPhones.indexOf(myPhone)].name = $scope.name;
      allPhones[allPhones.indexOf(myPhone)].snippet = $scope.snippet;
      allPhones[allPhones.indexOf(myPhone)].age = $scope.age;
      console.log('A phone was edited!.');
    };
  }]);
  
phonecatControllers.controller('PhoneDeleteCtrl', ['$scope', '$routeParams', 'Phone', '$location',
  function($scope, $routeParams, Phone, $location) {
    var phoneToDelete = [];
    console.log('Entered the PhoneDeleteCtrl controller.');
    for(var i = 0; i < allPhones.length; i++) {
      if (allPhones[i].id == $routeParams.phoneId) {
        var phoneToDelete = allPhones.splice(i,1);
        break;
      }
    }
    console.log('Number of phones that were deleted: ' + phoneToDelete.length);
    $location.path('/phones');
  }]);
