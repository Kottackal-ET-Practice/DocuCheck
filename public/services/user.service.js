(function()
{
	angular
		.module("WhiteBoardApp")
		.factory("UserService", UserService);
	function UserService($http)
	{
		var service = {
			createUser: createUser,
			loginUser: loginUser,
			updateUser : updateUser,
			logoutUser : logoutUser,
			uploadFile : uploadFile,
			documentView : documentView,
			viewAccounts : viewAccounts,
			searchUser : searchUser,
			requestView : requestView,
			viewReqs : viewReqs,
			perReqs : perReqs,
			verReq : verReq,
			viewPerUsers : viewPerUsers,
			profileLoad : profileLoad,
			remView : remView
		};
		return service;

		function profileLoad(user,callback)
		{
			$http.get('rest/viewuser/'+user)
			.success(callback);
		}

		function viewPerUsers(user,callback)
		{
			console.log(user);
			$http.get('rest/viewperusers/'+user)
			.success(callback);
		}

		function verReq(user,emp,callback)
		{
			console.log(user,emp);
			$http.put('/rest/verreq/'+user+'/'+emp)
			.success(callback);
		}

		function remView(user,emp,callback)
		{
			console.log(user,emp);
			$http.put('/rest/viewrem/'+user+'/'+emp)
			.success(callback);
		}

		function perReqs(user,callback)
		{
			console.log(user);
			$http.get('rest/perviews/'+user)
			.success(callback);
		}

		function viewReqs(user,callback)
		{
			console.log(user);
			$http.get('rest/reqviews/'+user)
			.success(callback);
		}

		function requestView(user,employer,callback)
		{
			console.log(user,employer);
			$http.post('rest/viewreq/'+user+'/'+employer)
			.success(callback);
		}

		function searchUser(user, callback)
		{
			console.log(user);
			$http.get('rest/usersearch/'+user)
			.success(callback);
		}

		function viewAccounts(callback)
		{
			$http.get('rest/viewacc')
			.success(callback);
		}		

		function documentView(user, callback)
		{
			$http.get('rest/docview',user)
			.success(callback);
		}

		function uploadFile(upload, callback)
		{
			$http.post("/rest/upload", upload)
				.success(callback);
		}

		function logoutUser(user, callback)
		{
			$http.post("/rest/logout")
				.success(callback);
		}

		function updateUser(user, callback)
		{
			$http.put("/rest/update", user)
				.success(callback);
		}

		function createUser(user, callback)
		{
			$http.post("/rest/register", user)
				.success(callback);
		}

		function loginUser(user, callback)
		{
			$http.post("/rest/login", user)
				.success(callback);
		}
		
	}
})();