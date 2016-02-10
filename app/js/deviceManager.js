'use strict';

var phoneDMServices = angular.module('phoneDMServices', []);

phoneDMServices.factory('DeviceManager', ['Phone', 
  function(Phone) {
    var allPhones = [];
    var initializeFlag = true;
    return { 
      getAllPhones: function() {
        if (initializeFlag) {
          var tempPhoneList = Phone.query(function() {
            for (var i=0; i<tempPhoneList.length; i++) {
              var tempPhone = {id: tempPhoneList[i].id, name: tempPhoneList[i].name, 
                               snippet: tempPhoneList[i].snippet, age: tempPhoneList[i].age, 
                               imageUrl: tempPhoneList[i].imageUrl};
              allPhones.push(tempPhone);
            }
          });
          initializeFlag = false;
        }
        return allPhones;
      },
      addPhone: function(newPhone) {
        allPhones.push(newPhone);
        return allPhones;
      },
      findPhoneById: function(phoneId) {
        var phoneFound = null;
        for(var i = 0; i < allPhones.length; i++) {
          if (allPhones[i].id == phoneId) {
            phoneFound = allPhones[i];
            break;
          }
        }
        return phoneFound;
      },
      savePhone: function(editedPhone) {
        var phoneUpdated = false;
        for(var i = 0; i < allPhones.length; i++) {
          if (allPhones[i].id == editedPhone.id) {
            allPhones[i].name = editedPhone.name;
            allPhones[i].snippet = editedPhone.snippet;
            allPhones[i].age = editedPhone.age;
            phoneUpdated = true;
            break;
          }
        }
        return phoneUpdated;
      },
      deletePhone: function(phoneId) {
        var phoneDeleted = false;
        for(var i = 0; i < allPhones.length; i++) {
          if (allPhones[i].id == phoneId) {
            allPhones.splice(i,1);
            phoneDeleted = true;
            break;
          }
        }
        return phoneDeleted;
      }
    };
  }]);