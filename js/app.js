'use strict';
/* App Controllers */


var memoryGameApp = angular.module('memoryGameApp', ['ng-chromecast', 'ngAudio']);


memoryGameApp.factory('game', function() {
  var cellNames = ['AngularJS', 'GoLang', 'Android', 'Chrome', 'Polymer', 'Dart', 'GoogleDrive', 'GoogleGlass',
    'GoogleTV', 'ChromeCast'];

  return new Game(cellNames);
});

memoryGameApp.controller('GameCtrl', ['$scope', 'game', 'ChromeCastReceiver', 'ngAudio', function ($scope, game, ChromeCastReceiver, ngAudio) {
      $scope.data = '?';

    $scope.game = game;
    
    $scope.X = 0;
    $scope.Y = 0;

    $scope.indexToChar = function(i) {
        return String.fromCharCode(i+65);
    };


    $scope.callback = function(data){
          
        $scope.data = data;
        $scope.$apply();
        
        $scope.X = data.charAt(1) - 1;
        
        //this is a trick to convert A,B,C,D chars in 0,1,2,3 index, 
        $scope.Y = data.charCodeAt(0) - 65; //65 is the ASCII code for the char 'A'


        if ($scope.Y >= 0 && $scope.Y <= 4)
          if ($scope.X >= 0 && $scope.X <= 5) {
              document.getElementById("item_"+ $scope.Y +"_"+$scope.X).click();
            } 
    };


    ChromeCastReceiver.initialize('urn:x-cast:com.google.cast.sample.helloworld',
                            $scope.callback);

 }]);