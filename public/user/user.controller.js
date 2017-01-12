(function()
{
	angular
		.module("WhiteBoardApp")
		.controller("UserController", UserController);

	function UserController(UserService, $rootScope, $scope, $http, Upload, $location)
	{
		var vm = this;

		vm.viewRequests = viewRequests;
		vm.verifyViewRequest = verifyViewRequest;
		vm.viewDocuments = viewDocuments;
		vm.verifyRequest = verifyRequest;
		vm.deleteDoc = deleteDoc;
		vm.fileUpload = fileUpload;
		vm.permittedRequests = permittedRequests;
		vm.removeView = removeView;

		//user operations

		function removeView(name,emp){
			UserService.remView(name, emp, function(response){
				console.log('success');				
			});
			location.reload(true);
		}

		function fileUpload(upload,username){

	      upload.file=upload.file[0].lfFile;

	      Upload.upload({
	        url: '/uploads/upload/'+username,
	        method: 'post',
	        data: $scope.upload
	      }).then(function (response) {
	        $location.url("/document");
	      })
	    };

		function viewRequests(user){
			UserService.viewReqs(user, function(response){
				$scope.accounts = response;
			});

		}
		function permittedRequests(user){
			UserService.perReqs(user, function(response){
				$scope.accounts = response;
			});

		}
		function verifyViewRequest(name,emp){
			UserService.verReq(name, emp, function(response){
				console.log('success');				
			});
			location.reload(true);
		}
		function viewDocuments(user){
			$http.get('/uploads/docview/'+user).then(function(response){
    			$scope.uploads = response.data;
  			});

		}
		function verifyRequest(id){
			$http.put('/uploads/'+id).then(function(response){
				console.log('success');
			});
			location.reload(true);
		}

		function deleteDoc(id){

			$http.put('/uploads/deldoc/'+id).then(function(response){
				console.log('success');
			});
			location.reload(true);
		}
	}
})();	