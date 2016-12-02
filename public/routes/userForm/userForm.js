/**
 * Created by dsk8 on 12/1/2016.
 */
angular.module("myapp")
    .directive("matchTo", function() {
        return {
            require: "ngModel",
            scope: {
                otherValue: "=matchTo"
            },
            link: function(scope, element, attributes, ngModel) {
                ngModel.$validators.matchTo = function(modelValue) {
                    return modelValue == scope.otherValue;
                };
                scope.$watch("otherValue", function() {
                    ngModel.$validate();
                });
            }
        };
    })
    .directive("uniqueUser", function($http, $q) {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, element, attribute, ngModel) {
                ngModel.$asyncValidators.unique = function(modelValue, viewValue) {
                    var value = modelValue || viewValue;

                    return $http.get('/checkUser?user=' + value)
                        .then(function(response) {
                            if (response.data.length != 0) {
                                return $q.reject();
                            }
                            return true;
                        });
                };
            }
        }
    })
    .controller("UserFormController", function($scope, $http, $location) {
        $scope.user = {};
        $scope.loggedUser = {};
        $scope.submitForm = function() {
            $http.post("/users", $scope.user)
                .success(function(data){
                    console.log("User has been saved");
                    $location.path("/");
                });
        }
        $scope.login = function() {
            $http.post("/login", $scope.loggedUser)
                .then(function(response) {
                    if (response.data) {
                        $location.path("/");
                    } else {
                        alert("Login / password is incorrect");
                        $scope.loggedUser = null;
                    }
                });
        }
    });