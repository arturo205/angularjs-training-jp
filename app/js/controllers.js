'use strict';

/* Controllers */

var phonecatControllers = angular.module('phonecatControllers', []);
var allPhones = [];
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
      
      var myPhone = {id: $scope.id, name: $scope.name, snippet: $scope.snippet, age: $scope.age, imageUrl: $scope.imageUrl};
      
      allPhones.push(myPhone);
      
      console.log('A new phone was added to the list!.');
      console.log('Number of phones in the list: ' + allPhones.length);
      console.log('List of all phones created so far:');
      console.log(allPhones);
    };
  }]);
