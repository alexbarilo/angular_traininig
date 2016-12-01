/**
 * Created by dsk8 on 11/30/2016.
 */
var module = angular.module("myapp", []);

module.config(
    function($routeProvider) {
        $routeProvider.
        when('/', {
            templateUrl: 'routes/notes/notes.html',
            controller: 'NotesController'
        }).
        otherwise({redirectTo: '/'})});