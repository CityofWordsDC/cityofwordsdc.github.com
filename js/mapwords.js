angular.module('app', [])
.controller('mapController', function($scope, $location) {

    L.mapbox.accessToken = 'pk.eyJ1Ijoiam9ucG1hcmlubyIsImEiOiJYXy1mZ0I0In0.ijc-81gmzUcpy4bFIgnKWg';
    var map = L.mapbox.map('map', 'jonpmarino.g9c77lie')
        .setView([38.892636142310295, -77.03106880187988], 13);

    //var featureLayer = L.mapbox.featureLayer().addTo(map);
    $scope.someData = [{author: 'James'}, {author: 'Joyce'}, {author: 'Ulysses'}];
    $scope.authors = [];
    
    $scope.updateMap = function() {};
    
    $scope.toggle = function(author) {
        var enabled = {};
        
        author.selected = !author.selected;
        
        for(var i = 0; i < $scope.authors.length; i++) {
            if ($scope.authors[i].selected == true) {
                enabled[$scope.authors[i].name] = true;
            }
        }
        
        $scope.updateMap(enabled);
    };
    
    $scope.selectAll = function(selecting) {
        var enabled = {};
        
         for(var i = 0; i < $scope.authors.length; i++) {
            $scope.authors[i].selected = selecting;
            if(selecting) {
                enabled[$scope.authors[i].name] = true;
            }
        }
        
        $scope.updateMap(enabled);
    };
    
    $scope.linkTo = function(url) {
        $location.url(url);
    };
    
    map.featureLayer.on('ready', function() {
        var authorObj = {}, authors = [];
        var features = map.featureLayer.getGeoJSON().features;
        
        for (var i = 0; i < features.length; i++) {
            authorObj[features[i].properties['title']] = true;
        }
        
        var j = 0;
        for (var k in authorObj) {
            $scope.authors.push({name: k, selected: true, id: j});
            j++;
        }
        
        $scope.updateMap = function(enabledList) {
            map.featureLayer.setFilter(function(feature) {
                return (feature.properties['title'] in enabledList);
            });
        };
        
        $scope.selectAll(true);
        
        $scope.$apply(); 
    });
});