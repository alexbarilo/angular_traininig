/**
 * Created by dsk8 on 11/28/2016.
 */
angular.module("myapp")
    .controller("NotesController", function($scope, $http){
    $scope.notes = [];
    var update = function() {
        $http
            .get("/notes")
            .success(function(notes) {
                $scope.notes = notes;
             });
    };
    update();

    $scope.add = function() {
        var note = {text: $scope.text};
        $http.post("/notes", note)
            .success(function() {
                $scope.text = "";
                update();
            })
            .error(function(error) {
                console.log(error)
            });
    };
    $scope.remove = function(id) {
        $http.delete("/notes", {params: {id:id}})
            .success(function() {
                update();
            })
    }
    $scope.sendOnTop = function(id) {
        $http.post("/notes/putOnTop", {params: {id:id}})
            .success(function() {
                update();
            })
    }
});