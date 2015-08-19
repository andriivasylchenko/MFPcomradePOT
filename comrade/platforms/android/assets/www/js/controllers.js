angular.module('app.controllers', [])

.controller('MainCtrl', function($scope){
  $scope.comrades = [];

  var comradesRequest = new WLResourceRequest(
    "/adapters/comradeAdapter/getComrades",
    WLResourceRequest.GET
  );

  comradesRequest.setQueryParameter("params", "[]");

  comradesRequest.send().then(
    getComradesSuccess,
    getComradesFailure
  );

  function getComradesSuccess(result){
    console.log('We got a comrades list', result.responseJSON.results);
    $scope.comrades = result.responseJSON.results;
    $scope.$apply();
  };

  function getComradesFailure(result){
    console.log('Failed to get a comrades list', result);
  }

})
