(function()
{
	angular
		.module("WhiteBoardApp")
		.controller("ProfileController", ProfileController);

	function ProfileController(UserService, $rootScope)
	{
		var vm = this;

		vm.updateUser = updateUser;

		function updateUser(user){
			UserService.updateUser(user, function(response){
				console.log("Success");
			});
		}
	}
})();