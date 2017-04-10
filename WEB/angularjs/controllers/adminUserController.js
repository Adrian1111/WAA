angular.module("usterkaAdmin")
.constant("userUrl", "http://tranquil-hamlet-1905.herokuapp.com/users/")
.constant("userDataUrl", "http://tranquil-hamlet-1905.herokuapp.com/userdata/")
.constant("allUsers","http://tranquil-hamlet-1905.herokuapp.com/allusers/")
.config(function($httpProvider) {
    $httpProvider.defaults.withCredentials = true;
})
.controller("userCtrl", function ($scope, $resource, $http, $window, userUrl, userDataUrl, allUsers) {

    $scope.infoResource = $resource(userDataUrl + ":id", { id: "@id" });

    $scope.listInfo = function () {
        $scope.info = $scope.infoResource.query()
    };
    $scope.startEdit = function (info) {
        $scope.editedInfo = info;
    };
    $scope.updateInfo = function (info) {
        info.$save();
        $scope.editedInfo = null;    
    };
   

    $scope.listInfo();

    $scope.data={};
    $http.get(userUrl)
    .then(function (data) {
        $scope.data.users = data;
        //console.log($scope.data.users);
    })
    .catch(function (error) {
        $scope.data.error = error;
    });
    $http.get(userDataUrl)
    .then(function (data) {
        $scope.data.usersData = data;

    })
    .catch(function (error) {
        $scope.data.error = error;
    });
    $scope.data.existUsers=[];
    $http.get(allUsers)
    .then(function (data) {
        $scope.data.allUsers = data;
      console.log($scope.data.allUsers[0].username);
      
      angular.forEach($scope.data.allUsers, function(value, key) {
      this.push(value.username);
      }, $scope.data.existUsers);
    })
    .catch(function (error) {
        $scope.data.error = error;
    });

       $scope.headers = { 'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp',
    'Content-Type':'application/x-www-form-urlencoded'};



    $scope.sendUser = function (userDetails) {

        $http.post(prefix + '/users/add','username='+userDetails.username+'&'+'password='+userDetails.password+'&'+'isActive=yes', { headers: $scope.headers }  )

            .then(function successCallback(data) {

                if(data.data == 'OK'){
                    $scope.data.userId = data.id;

                    $scope.data.previousUserLogin = data.username;

                    $scope.data.visible = true;
                }else{
                    $window.confirm(data.data);
                }


            }, function errorCallback(error) {
                $window.confirm(error);
                $scope.data.userError = error;

            });
    };




    $scope.sendUserData = function (userDetails) {
   
       if(!userDetails.name){
            userDetails.name=" ";
        }
          if(!userDetails.surname){
            userDetails.surname=" ";
        }
          if(!userDetails.city){
            userDetails.city=" ";
        }   
        if(!userDetails.citycode){
            userDetails.citycode=" ";
        }
        if(!userDetails.street){
            userDetails.street=" ";
        }
        if(!userDetails.streetnumber){
            userDetails.streetnumber=" ";
        }
        if(!userDetails.apartmentnumber){
            userDetails.apartmentnumber=" ";
        }
        if(!userDetails.email){
            userDetails.email=" ";
        }
        if(!userDetails.phonenumber){
            userDetails.phonenumber=" ";

        }

        var userData = angular.copy(userDetails);
        userData.userid=$scope.data.previousUserLogin;
        $http.post(prefix + '/userdata/add','name='+userDetails.name+'&'
            +'surname='+userDetails.surname+'&'
            +'city='+userDetails.city+'&'
            +'citycode='+userDetails.citycode+'&'
            +'street='+userDetails.street+'&'
            +'streetnumber='+userDetails.streetnumber+'&'
            +'apartmentnumber='+userDetails.apartmentnumber+'&'
            +'email='+userDetails.email+'&'
            +'phonenumber='+userDetails.phonenumber+'&'
            +'userid='+$scope.data.addUser.username+'&'
            , { headers: $scope.headers })
        .then(function (data) {

            $scope.data.userDataId = data.id;
            $scope.data.visible = false;
            $http.get(userUrl)
            .then(function (data) {
                $scope.data.users = data;
 
    });
             $http.get(userDataUrl)
    .then(function (data) {
        $scope.data.usersData = data;
    });
            $http.get(userUrl)
            .then(function (data) {
                $scope.data.users = data;
    });

            $scope.reload();
        })
        .catch(function (error,data) {
            $scope.data.userDetailError = error;
        })
        .finally(function () {

        });
    };
   
    $scope.updateData = function(userDetails){
        console.log(userDetails);
      
         $http.post(prefix + '/userdata','name='+userDetails.name+'&'
            +'surname='+userDetails.surname+'&'
            +'city='+userDetails.city+'&'
            +'citycode='+userDetails.citycode+'&'
            +'street='+userDetails.street+'&'
            +'streetnumber='+userDetails.streetnumber+'&'
            +'apartmentnumber='+userDetails.apartmentnumber+'&'
            +'email='+userDetails.email+'&'
            +'phonenumber='+userDetails.phonenumber+'&'
            +'id='+userDetails.id
      
            , { headers: $scope.headers });
        $scope.editedData = null;
    };

    $scope.reloadPage = function(){
        window.location.reload();
    };

    $scope.getUserId = function (userName){
         $scope.reloadPage();
        $scope.data.res = "empty";
        for(var i =0; i< $scope.data.users.length; i++){
            if($scope.data.users[i]["username"]==userName){
                $scope.data.res = $scope.data.users[i]["id"];       
                break;         
            }
        }
    };
    $scope.selectEvent = function(event){
        $scope.selectedEvent = event;
        javascript:scroll(0,0);
    };
    $scope.delUser = function(info){
 
       var deleteUser = $window.confirm('Do you want to remove this user?');
       if (deleteUser) {
            $http.post(prefix + '/users/delete2','no=no&yes=yes&'+'id='+info.id, { headers: $scope.headers } );
            $scope.selectedEvent=false;
            $http.get(userUrl)
            .then(function (data) {
                $scope.data.users = data;

    });
            $http.get(userUrl)
            .then(function (data) {
                $scope.data.users = data;
    });

        }
    };
   
    $scope.predicate = 'username';
    $scope.reverse = false;
    $scope.order = function (predicate) {
        $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : true;
        $scope.predicate = predicate;

    };
});