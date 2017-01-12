(function()
{
	angular
		.module("WhiteBoardApp")
		.controller("EmployerController", EmployerController);

	function EmployerController(UserService, $location, $rootScope, $scope)
	{
		var vm = this;
		vm.search = search;
		vm.viewRequest = viewRequest;
		vm.listPermViews = listPermViews;

		//employer functions

		function listPermViews(user){
			UserService.viewPerUsers(user, function(response){
				$scope.accounts = response;
			});
		}

		function search(user){
			UserService.searchUser(user, function(response){
				if(response!=null)
					$scope.accounts = response;
			});
		}

		function viewRequest(user,employer){
			UserService.requestView(user,employer,function(response){
				if(response!=null)
					console.log("Success");
			});
			location.reload(true);
		}
		
	}
})();