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
    .controller("UserFormController", function($scope, $http) {
        $scope.user = {};
    });