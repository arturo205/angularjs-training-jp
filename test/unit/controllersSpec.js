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
  beforeEach(module('phoneDMServices')); 

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
    var scope, ctrl, DeviceManagerMock, phonesQty;
    
    beforeEach(function() {
      DeviceManagerMock = {
        addPhone: function(newPhone) {
          phonesQty ++;
        }
      };
    });
    
    beforeEach(inject(function($rootScope, $controller) {
      phonesQty = 20;
      scope = $rootScope.$new();
      ctrl = $controller('PhoneAddCtrl', {$scope: scope, DeviceManager: DeviceManagerMock});
    }));
    
    it('should call addPhone service method', function($rootScope) {
      spyOn(DeviceManagerMock, 'addPhone').andCallThrough();
      scope.addNewPhone({id:'My new phone'});
      expect(DeviceManagerMock.addPhone).toHaveBeenCalled();
    });
    
    it('should increase the phone list by one', function($rootScope) {
      scope.addNewPhone({id:'My new phone'});
      expect(phonesQty).toBe(21);
    });
  });
  
  describe('PhoneDeleteCtrl', function(){
    var scope, ctrl, DeviceManagerMock, phonesQty;
    
    beforeEach(function() {
      DeviceManagerMock = {
        deletePhone: function(phoneId) {
          phonesQty --;
        }
      };
    });
    
    beforeEach(inject(function($rootScope, $controller, $routeParams) {
      phonesQty = 20;
      $routeParams.phoneId = 'my phone';
      scope = $rootScope.$new();
      spyOn(DeviceManagerMock, 'deletePhone').andCallThrough();
      ctrl = $controller('PhoneDeleteCtrl', {$scope: scope, DeviceManager: DeviceManagerMock});
    }));
    
    it('should call deletePhone service method', function($rootScope) {
      expect(DeviceManagerMock.deletePhone).toHaveBeenCalled();
    });
    
    it('should decrease the phone list by one', function($rootScope) {
      expect(phonesQty).toBe(19);
    });
  });
});
