(function()
{
	angular
		.module("WhiteBoardApp")
		.controller("LoginController", LoginController);

	function LoginController(UserService, $location, $rootScope)
	{
		var vm = this;
		vm.login = login;

		function login(user){
			UserService.loginUser(user, function(response){
				if(response==null)
					vm.message = "User not found";
				else{
					$rootScope.currentUser = response;
					$location.url("/profile");
				}
			});
		}
	}
})();