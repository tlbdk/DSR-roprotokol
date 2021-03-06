'use strict';

app.controller('TodayCtrl', ['$scope', '$routeParams', 'DatabaseService', '$interval', 'ngDialog', function ($scope, $routeParams, DatabaseService, $interval, ngForm) {
  $scope.trips=[];
  $scope.onwater=[];
  $scope.available=[];
  $scope.num4=0;
  $scope.num2=0;
  $scope.rowers=0;
  $scope.coxs=0;
  $scope.manerr="";

  
  $scope.maxcrew=0;
  $scope.updatecrew = function() {
    //    alert(" foo "+$scope.coxs+":"+$scope.rowers);
    var a2=$scope.available["Inrigger 2+"].amount;
    var a4=$scope.available["Inrigger 4+"].amount;
    var max2=Math.floor(($scope.rowers+$scope.coxs)/3);
    var max4=Math.floor(($scope.rowers+$scope.coxs)/5);
    var bcms=[];
    if (max4>$scope.coxs) {
      max4=$scope.coxs;
    }
    if (max2>$scope.coxs) {
      max2=$scope.coxs;
    }
    if (max4>a4) {
      max4=a4;
    }
    if (max2>a2) {
      max2=a2;
    }
    var c2;
    var c4;
    var mc=0;
    for (c2=0; c2<=max2; c2=c2+1) {
      for (c4=0; c4<=max4; c4=c4+1) {
	if (c2*3+c4*5<=$scope.rowers+$scope.coxs && c2*3+c4*5>mc && c2+c4<=$scope.coxs) {
	  mc=c2*3+c4*5;
	} 
      }
    }
    
    for (c2=0; c2<=max2; c2=c2+1) {
      for (c4=0; c4<=max4; c4=c4+1) {
	if (c2*3+c4*5==mc && c2+c4<=$scope.coxs) {
	  bcms.push({"i2":c2,"i4":c4});
	} 
      }
    }
    $scope.maxcrew=mc;
    $scope.boatcoms=bcms;
  };
  
    DatabaseService.init().then(function () {
    }
			       );
  DatabaseService.getTodaysTrips(function (res) {
    $scope.trips=res.data;
  }
				);
  DatabaseService.getOnWater(function (res) {
    $scope.onwater=res.data;
  }
				);
  DatabaseService.getAvailableBoats('DSR',function (res) {
    $scope.available=res.data;
  }
				);
  
}]);
