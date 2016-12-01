/**
 * Created by dsk8 on 11/30/2016.
 */
var module = angular.module("myapp", ['ngRoute']);

module.config(
    function($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        $routeProvider.
        when('/', {
            templateUrl: 'routes/notes/notes.html',
            controller: 'NotesController'
        }).when('/section:name', {
            templateUrl: 'routes/viewSection/viewSection.html',
            controller: 'ViewSectionController'
        }).when('/:section?', {
            templateUrl: 'routes/notes/notes.html',
            controller: 'NotesController'
        }).otherwise({redirectTo: '/'})});