(function()
{
	angular
		.module("WhiteBoardApp")
		.controller("RegisterController", RegisterController);

	function RegisterController(UserService, $location)
	{
		var vm = this;
		vm.register = function(user){
			UserService.createUser(user, function(response){
				if(response==null)
					vm.message = "Registration failed";
				else
					$location.url("/login");
			});
		}
	}
})();