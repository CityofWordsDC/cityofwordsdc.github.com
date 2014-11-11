angular.module('app', [])
.controller('mapController', function($scope) {

    L.mapbox.accessToken = 'pk.eyJ1Ijoiam9ucG1hcmlubyIsImEiOiJYXy1mZ0I0In0.ijc-81gmzUcpy4bFIgnKWg';
    var map = L.mapbox.map('map', 'jonpmarino.g9c77lie')
        .setView([38.892636142310295, -77.03106880187988], 13);

    //var featureLayer = L.mapbox.featureLayer().addTo(map);
    $scope.someData = [{author: 'James'}, {author: 'Joyce'}, {author: 'Ulysses'}];
    $scope.authors = [];
    $scope.updateMap = function() {};
    
    map.featureLayer.on('ready', function() {
        var authorObj = {}, authors = [];
        var features = map.featureLayer.getGeoJSON().features;
        
        for (var i = 0; i < features.length; i++) {
            authorObj[features[i].properties['title']] = true;
        }
        
        for (var k in authorObj) $scope.authors.push({name: k});
        $scope.authors.sort();
        
        $scope.updateMap = function() {
            map.featureLayer.setFilter(function(feature) {
                return (feature.properties['title'] == $scope.selectedAuthor.name);
            });
        };
        
        $scope.$apply(); 
    });
});