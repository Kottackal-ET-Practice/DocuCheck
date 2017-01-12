(function()
{
	angular
		.module("WhiteBoardApp")
		.config(Config);
	
	function Config($routeProvider)
	{
		$routeProvider
			.when("/home", {templateUrl: "home/home.view.html"})
			.when("/register", 
				{
					templateUrl: "register/register.view.html",
					controller : "RegisterController as controller"
				})
			.when("/login", 
				{
					templateUrl: "login/login.view.html",
					controller: "LoginController as controller"
				})
			.when("/profile", 
				{
					templateUrl: "profile/profile.view.html",
					controller: "ProfileController as controller",
					resolve : {
						loggedin : checkLoggedIn
					}
				})
			.when("/adaccview", 
				{
					templateUrl: "admin/adminav.view.html",
					controller: "AdminController as controller",
					resolve : {
						loggedin : checkLoggedIn
					}
				})
			.when("/adfileview", 
				{
					templateUrl: "admin/adminfv.view.html",
					controller: "AdminController as controller",
					resolve : {
						loggedin : checkLoggedIn
					}
				})
			.when("/adminadd", 
				{
					templateUrl: "admin/adminadd.view.html",
					controller: "AdminController as controller",
					resolve : {
						loggedin : checkLoggedIn
					}
				})
			.when("/emsearch", 
				{
					templateUrl: "employer/emsearch.view.html",
					controller: "EmployerController as controller",
					resolve : {
						loggedin : checkLoggedIn
					}
				})
			.when("/emview", 
				{
					templateUrl: "employer/emview.view.html",
					controller: "EmployerController as controller",
					resolve : {
						loggedin : checkLoggedIn
					}
				})			
			.when("/userdetails/:user", 
				{
					templateUrl: "details/details.view.html",
					controller: "DetailsController as controller",
					resolve : {
						loggedin : checkLoggedIn
					}
				})
			.when("/upload", 
				{
					templateUrl: "user/upload.view.html",
					controller: "UserController as controller",
					resolve : {
						loggedin : checkLoggedIn
					}
				})
			.when("/document", 
				{
					templateUrl: "user/document.view.html",
					controller: "UserController as controller",
					resolve : {
						loggedin : checkLoggedIn
					}
				})
			.when("/viewrequest", 
				{
					templateUrl: "user/userreqview.view.html",
					controller: "UserController as controller",
					resolve : {
						loggedin : checkLoggedIn
					}
				})
			.when("/permrequest", 
				{
					templateUrl: "user/userperview.view.html",
					controller: "UserController as controller",
					resolve : {
						loggedin : checkLoggedIn
					}
				})
			.when("/verify", 
				{
					templateUrl: "verifier/verify.view.html",
					controller: "VerifierController as controller",
					resolve : {
						loggedin : checkLoggedIn
					}
				})
			.when("/vhistory", 
				{
					templateUrl: "verifier/vhistory.view.html",
					controller: "VerifierController as controller",
					resolve : {
						loggedin : checkLoggedIn
					}
				})
			.when("/logout", 
				{
					templateUrl: "home/home.view.html",
					resolve : {
						loggedin : checkLoggedIn
					}
				})
			.otherwise({redirectTo:"/home"})
	}
})();

function checkLoggedIn($q, $http, $location, $rootScope){
	var deferred = $q.defer();

	$http.get("/rest/loggedin")
	.success(function(user){
		if(user!='0'){
			$rootScope.currentUser = user;
			deferred.resolve();
		}
		else{
			$rootScope.currentUser = null;
			deferred.reject();
			$location.url("/home");
		}
	});
	return deferred.promise;
}