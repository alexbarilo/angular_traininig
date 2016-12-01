/**
 * Created by dsk8 on 11/29/2016.
 */
var module = angular.module("myapp");
module.controller("HelloController", function($scope, $http){
    $scope.greetings = "";
    $scope.update = function() {
        if ($scope.name) {
            $http
                .get("/greeting",
                    {params:
                    {name: $scope.name}
                    })
                .success(function(res) {
                    $scope.greetings = res;
                });
        }
    }
});