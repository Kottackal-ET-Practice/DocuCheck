(function()
{
	angular
		.module("WhiteBoardApp")
		.controller("MainController", MainController);

	function MainController(UserService, $location, $rootScope, $scope, $mdBottomSheet, $mdSidenav, $mdDialog)
	{
		var vm = this;
		vm.logout = logout;
		vm.toggleSidenav = toggleSidenav;

		function logout()
		{
			UserService.logoutUser(function(response){
				$rootScope.currentUser = null;
				$location.url("/home");
			});
			
		}

		function toggleSidenav(menuId)
		{
			$mdSidenav(menuId).toggle();
			
		}	
	  
	}

})();