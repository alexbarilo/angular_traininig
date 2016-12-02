/**
 * Created by dsk8 on 12/2/2016.
 */
angular.module("myapp")
    .controller("LoginController", function($scope, UserService) {
        $scope.loggedIn = UserService.loggedIn;
        $scope.login = function() {
            UserService.login($scope.userName, $scope.password)
    }
});
