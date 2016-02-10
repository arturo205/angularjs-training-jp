'use strict';

/* App Module */

var phonecatApp = angular.module('phonecatApp', [
  'ngRoute',
  'phonecatAnimations',
  'phonecatControllers',
  'phonecatFilters',
  'phoneDMServices',
  'phonecatServices'
]);

phonecatApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/phones', {
        templateUrl: 'partials/phone-list.html',
        controller: 'PhoneListCtrl'
      }).
      when('/phones/:phoneId', {
        templateUrl: 'partials/phone-detail.html',
        controller: 'PhoneDetailCtrl'
      }).
      when('/addPhone', {
        templateUrl: 'partials/addPhone.html',
        controller: 'PhoneAddCtrl'
      }).
      when('/phones/:phoneId/edit', {
        templateUrl: 'partials/edit-phone.html',
        controller: 'PhoneEditCtrl'
      }).
      when('/phones/:phoneId/delete', {
        templateUrl: 'partials/phone-list.html',
        controller: 'PhoneDeleteCtrl'
      }).
      otherwise({
        redirectTo: '/phones'
      });
  }]);
