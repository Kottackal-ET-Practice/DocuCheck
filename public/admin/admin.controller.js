(function()
{
	angular
		.module("WhiteBoardApp")
		.controller("AdminController", AdminController);

	function AdminController(UserService, $scope, $http)
	{
		var vm = this;

		vm.register = register;
		vm.fetchAccounts = fetchAccounts;
		vm.fetchFiles = fetchFiles;

		//admin functions

		function register(user){
			UserService.createUser(user, function(response){
				if(response==null)
					vm.message = "Registration failed";
			});
		}

		function fetchAccounts(){
			UserService.viewAccounts(function(response){
				if(response!=null)
					$scope.accounts = response;
			});

		}

		function fetchFiles(){
			$http.get('/uploads').then(function(response){
				$scope.uploads = response.data;
		});
	}
}
})();