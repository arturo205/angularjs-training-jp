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
    var scope, ctrl, $httpBackend, DeviceManagerMock, phonesQty;
    
    beforeEach(function() {
      DeviceManagerMock = {
        getAllPhones: function() {
          return [{id: 'phone1', name: 'Nexus S'}, {id: 'phone2', name: 'Motorola DROID'}];
        },
        deletePhone: function(phoneId) { 
          phonesQty --;
        }
      };
    });

    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
      scope = $rootScope.$new();
      ctrl = $controller('PhoneListCtrl', {$scope: scope, DeviceManager: DeviceManagerMock});
      phonesQty = 2;
    }));


    it('should create "phones" model with 2 phones', function() {
      expect(scope.phones).toEqualData([{id: 'phone1', name: 'Nexus S'}, {id: 'phone2', name: 'Motorola DROID'}]);
    });


    it('should set the default value of orderProp model', function() {
      expect(scope.orderProp).toBe('name');
    });
    
    it('should call deletePhone service method', function($rootScope) {
      spyOn(DeviceManagerMock, 'deletePhone').andCallThrough();
      scope.deletePhone('phone1');
      expect(DeviceManagerMock.deletePhone).toHaveBeenCalled();
    });
    
    it('should decrease the phone list by one', function($rootScope) {
      scope.deletePhone('phone1');
      expect(phonesQty).toBe(1);
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
    var scope, ctrl, DeviceManagerMock;
    
    beforeEach(function() {
      DeviceManagerMock = {
        addPhone: function(newPhone) { }
      };
    });
    
    beforeEach(inject(function($rootScope, $controller) {
      scope = $rootScope.$new();
      ctrl = $controller('PhoneAddCtrl', {$scope: scope, DeviceManager: DeviceManagerMock});
    }));
    
    it('should call addPhone service method', function($rootScope) {
      spyOn(DeviceManagerMock, 'addPhone').andCallThrough();
      scope.addNewPhone({id:'My new phone'});
      expect(DeviceManagerMock.addPhone).toHaveBeenCalled();
    });
  });
});
