'use strict';

/* jasmine specs for controllers go here */
describe('PhoneCat controllers', function() {

  beforeEach(function(){
    this.addMatchers({
      toEqualData: function(expected) {
        return angular.equals(this.actual, expected);
      }
    });
  });

  beforeEach(module('phonecatApp'));
  beforeEach(module('phonecatServices'));

  describe('PhoneListCtrl', function(){
    var scope, ctrl, $httpBackend;

    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('phones/phones.json').
          respond([{name: 'Nexus S'}, {name: 'Motorola DROID'}]);

      scope = $rootScope.$new();
      ctrl = $controller('PhoneListCtrl', {$scope: scope});
    }));


    it('should create "phones" model with 2 phones fetched from xhr', function() {
      expect(scope.phones).toEqualData([]);
      $httpBackend.flush();

      expect(scope.phones).toEqualData(
          [{name: 'Nexus S'}, {name: 'Motorola DROID'}]);
    });


    it('should set the default value of orderProp model', function() {
      expect(scope.orderProp).toBe('name');
    });
  });


  describe('PhoneDetailCtrl', function(){
    var scope, $httpBackend, ctrl,
      xyzPhoneData = function() {
        return {
          name: 'phone xyz',
          images: ['image/url1.png', 'image/url2.png']
        };
      };


    beforeEach(inject(function(_$httpBackend_, $rootScope, $routeParams, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('phones/xyz.json').respond(xyzPhoneData());

      $routeParams.phoneId = 'xyz';
      scope = $rootScope.$new();
      ctrl = $controller('PhoneDetailCtrl', {$scope: scope});
    }));


    it('should fetch phone detail', function() {
      expect(scope.phone).toEqualData({});
      $httpBackend.flush();

      expect(scope.phone).toEqualData(xyzPhoneData());
    });
    
    it('should fetch phone detail', function() {
      expect(scope.phone).toEqualData({});
      $httpBackend.flush();

      expect(scope.phone).toEqualData(xyzPhoneData());
    });
  });
  
  describe('PhoneAddCtrl', function(){
    var phones = [];
    var scope, ctrl;
    
    beforeEach(inject(function($rootScope, $controller) {
      scope = $rootScope.$new();
      ctrl = $controller('PhoneAddCtrl', {$scope: scope});
      scope.addNewPhone = function() {
        phones.push({name:'Object'});
      };
    }));
    
    it('should create a new phone', function($rootScope) {
      expect(phones.length).toBe(0);
      scope.addNewPhone({id:345, name:'My Phone', snippet:'The best phone',
                         age:0, imageUrl:'img/phones/motorola-atrix-4g.0.jpg'});
      expect(phones.length).toBe(1);
    });
  });
  
  describe('PhoneDeleteCtrl', function(){
    var phones = [{id:'phone1'},{id:'phone2'},{id:'phone3'},{id:'phone4'}];
    var scope, ctrl;
    
    beforeEach(inject(function($rootScope, $controller, $routeParams) {
      $routeParams.phoneId = 'phone2';
      scope = $rootScope.$new();
      ctrl = $controller('PhoneDeleteCtrl', {$scope: scope});
      for(var i = 0; i < phones.length; i++) {
        if (phones[i].id == $routeParams.phoneId) {
          phones.splice(i,1);
          break;
        }
      }
    }));
    
    it('should remove one phone', function($rootScope) {
      expect(phones.length).toBe(3);
    });
  });
});
