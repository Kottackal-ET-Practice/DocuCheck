(function()
{
	angular
		.module("WhiteBoardApp")
		.controller("VerifierController", VerifierController);

	function VerifierController(UserService, $scope, $http, $location)
	{	
		var vm = this;

		vm.verifyList = verifyList;
		vm.verifyResponse = verifyResponse;
		vm.rejectResponse = rejectResponse;
		vm.verifyHistory = verifyHistory;

		//verifier operations

		function verifyList(user){
			$http.get('/uploads/verifylist/'+user).then(function(response){
    			$scope.tasks = response.data;
  			});
		}
		function verifyResponse(id){
			$http.put('/uploads/response/'+id).then(function(response){
				console.log('success');
			});
			location.reload(true);
		}
		function rejectResponse(id){
			$http.put('/uploads/rejresponse/'+id).then(function(response){
				console.log('success');
			});
			location.reload(true);
		}
		function verifyHistory(user){
			$http.get('/uploads/verifyhistory/'+user).then(function(response){
    			$scope.tasks = response.data;
  			});

		}
	}
})();