angular.module('app.controllers', [])

.controller('MainCtrl', function($scope, $state){
  $scope.comrades = [];
  $scope.displayError = false;

  $scope.getComrades = function() {
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
};

  $scope.goto = function(comrade) {
    console.log('Current comrade', comrade);
    $scope.currentComrade = comrade;
    $state.go('details');
  }

  $scope.doLogout = function() {
    WL.Client.logout('AuthRealm');
    $scope.username = '';
    $scope.password = '';
    $scope.username = [];
    $state.go('login');
  }

  $scope.doLogin = function(username, password) {

    var AuthRealmChallengeHandler = WL.Client.createChallengeHandler("AuthRealm");

AuthRealmChallengeHandler.isCustomResponse = function(response) {
	if (!response || !response.responseJSON	|| response.responseText === null) {
		return false;
	}
	if (typeof(response.responseJSON.authRequired) !== 'undefined'){
		return true;
	} else {
		return false;
	}
};

AuthRealmChallengeHandler.handleChallenge = function(response){
	var authRequired = response.responseJSON.authRequired;

	if (authRequired == true){
      console.log('authRequired ', authRequired);

		if (response.responseJSON.errorMessage)
        console.log('Auth error ', response.responseJSON.errorMessage);
        $scope.displayError = true;
        $scope.displayMessage = response.responseJSON.errorMessage;
        $scope.$apply();

	} else if (authRequired == false){
		console.log('authRequired ', authRequired);
		AuthRealmChallengeHandler.submitSuccess();
    $scope.displayError = false;
    $scope.getComrades();
    $state.go('main');
	}
};

	var invocationData = {
		adapter : "comradeAuthAdapter",
		procedure : "submitAuthentication",
		parameters : [ username, password ]
	};

	AuthRealmChallengeHandler.submitAdapterAuthentication(invocationData, {});



  }

})
