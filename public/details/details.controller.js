(function()
{
	angular
		.module("WhiteBoardApp")
		.controller("DetailsController", DetailsController);

	function DetailsController(UserService, $scope, $http, $routeParams)
	{
		var vm = this;
		var p = $routeParams.user;

		vm.loadDocuments = loadDocuments;
		vm.loadProfile = loadProfile;

		function loadDocuments(){
			$http.get('/uploads/loaddoc/'+p).then(function(response){
    			$scope.uploads = response.data;
  			});
		}

		function loadProfile(){
			UserService.profileLoad(p, function(response){
				$scope.account = response[0]; 
			});
		}
		
	}
})();	