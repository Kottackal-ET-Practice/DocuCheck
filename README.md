# DocuCheck

##Introduction

The DocuCheck application is being developed to automate the document verification process. Any kind of document can be uploaded to the repository and can be requested for verification by the corresponding verifier.

A user gets the options of uploading the document, managing the document and manage his/her profile. Also user can view the view requests from employers. The user can view uploaded documents, request verification and delete the documents. Also user can see the current status of the document from the labels. In view request approval section, user can approve or reject view requests raised by employers.

The verifier verifies the documents requested by users. Verifier views the documents, verifies its details and verifies the document if genuine. Else rejects it. The verifier can also view the history of all verified documents.

The employer can search for users and view their profile. For this the employer searches for user. And requests for view approval. This request if approved by the user, then the employer can view the users details and his/her verified documents.

Admin can view all accounts and documents. Also admin can add users. Verifiers can only be added by admin. A user cannot register as verifier. 

##Code Structure

The server.js file starts the server and listens to requests. The methods to handle server calls are also written in server.js. These calls are made by corresponding controllers and services. The uploads.js file handles the calls on file DB. 

1. For user registration, register.controller.js (‘public/register’) is being called. This module handles the user registration process. The database schema is mentioned as UserSchema in server.js.
2. On user login, login.controller.js (‘public/login’) is being called. This module handles the authentication check for user. The database schema is mentioned in server.js.
3. The admin module is controlled by admin.controller.js (‘public/admin’). The operations of viewing all users and files and also adding of new users, are assigned to the admin.
4. The user module is controlled by user.controller.js (‘public/user’). User gets the functions of uploading a file, view and request verification of documents, manage view requests from employers. And also user can manage view permission given to employers. The file upload database schema is FileSchema in uploads.js.
5. The verifier module functions are managed by verifier.controller.js (‘public/verifier’). Verifier can view the verification requests and approve/reject the request. Also verifier can view history of verifications.
6. The employer module is controlled by employer.controller.js (‘public/employer’). Employer can search for employees using their username. Employer can send view requests to employees and view employees, who accepted their request. The view sharing database schema is ShareSchema mentioned in server.js.

##Install dependencies
```
$ npm install
```

##Start the server
```
$ node server.js
```

##Browser URL
```
http://localhost:4000
```
	
