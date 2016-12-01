/**
 * Created by dsk8 on 11/28/2016.
 */
angular.module("myapp")
    .controller("NotesController", function($scope, $http, $routeParams, $location){
    $scope.notes = [];
    $scope.activeSection = $routeParams.section;
    var update = function() {
        var params = {params:{section:$scope.activeSection}};
        $http.get("/notes", params)
            .then(function successCallback(response) {
                $scope.notes = response.data;
                console.log(JSON.stringify($scope.notes));
            },
            function errorCallback(error) {
                console.log(error);
            });
    };
    update();

    var readSections = function() {
        $http.get("/sections")
            .success(function(sections) {
                $scope.sections = sections;
                if ($scope.activeSection == null && $scope.sections.length >0 ) {
                    $scope.activeSection = $scope.sections[0].title;
                }
                update();
            });
    }();

    $scope.showSection = function(section) {
        $scope.activeSection = section.title;
        $location.path(section.title);
        update();
    };

    $scope.writeSections = function() {
        if ($scope.sections && $scope.sections.length > 0) {
            $http.post("/sections/replace", $scope.sections);
        }
    };

    $scope.addSection = function() {
        if ($scope.newSection.length==0) {
            return;
        }
        for (var i=0;i<$scope.sections.length;i++) {
            if ($scope.sections[i].title==$scope.newSection) {
                return;
            }
        }
        var section = {title: $scope.newSection};
        $scope.sections.unshift(section);
        $scope.activeSection = $scope.newSection;
        $scope.newSection = "";
        $scope.writeSections();
        update();
    };

    $scope.addNote = function() {
        var note = {text: $scope.text};
        // if (!$scope.text || $scope.text.length==0) return;
        note.date = new Date();
        note.section = $scope.activeSection;
        $http.get("/findMinNote")
            .success(function(result) {
                note.order = result.order == null ? 1 : result.order + 1;
                console.log("note.orderNum " + note.order);
                $http.post("/notes", note)
                    .success(function() {
                        $scope.text = "";
                        update();
                    })
                    .error(function(error) {
                        // console.log(error)
                    });
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