define(['app', 'moment'], function (app, moment) {
    'use strict';

    var HereMaps = function ($timeout) {
        return {
            restrict: 'E',

            scope: {
                appId: '@',
                appCode: '@',
                markers: '=',
                overlay: '='
            },

            link: function (scope, element) {

                nokia.Settings.set("app_id", scope.appId);
                nokia.Settings.set("app_code", scope.appCode);

                var bubbles = new nokia.maps.map.component.InfoBubbles();

                var map = new nokia.maps.map.Display(element[0], {
                    zoomLevel: 10,
                    center: [52.51, 13.4],
                    components:[bubbles, new nokia.maps.map.component.Behavior()]
                });

                var container = new nokia.maps.map.Container();
                map.objects.add(container);

                var circle = {pen: { strokeColor: "#00ACEE", lineWidth: 1}, brush: {color: "rgba(255, 255, 255, 0.4)"}};
                var coordinate = new nokia.maps.geo.Coordinate(0, 0);
                var area = new nokia.maps.map.Circle(coordinate, 0, circle);
                map.objects.add(area);

                var _markers = [];

                var createMarkers = function(markers) {

                    return markers.map(function(m) {

                        var marker = new nokia.maps.map.Marker(m.geo.coordinates, {
                            icon: "/images/twitter.png",
                            anchor: new nokia.maps.util.Point(18, 18)
                        });

                        marker.addListener('click', function(e) {
                            bubbles.openBubble(createContent(m), marker.coordinate);
                        });

                        return marker;
                    });
                };

                var createContent = function(marker) {
                    var content = '<div class="bubble-content">' +
                    '<div class="profile-image"><img src="{{profile_image}}"/></div>' +
                    '<div class="tweet-content">' +
                    '<div class="profile-title">{{name}}' +
                    '<a class="twitter-link" href="https://twitter.com/{{screen_name}}" target="_blank">(@{{screen_name}})</a></div>' +
                    '<div class="tweet">{{tweet_text}}</div>' +
                    '<div class="tweet-time">Created at {{created_at}}</div>' +
                    '</div><div class="clearfix"></div></div>';

                    content = content
                        .replace(/{{profile_image}}/, marker.user.profile_image_url_https)
                        .replace(/{{name}}/, marker.user.name)
                        .replace(/{{screen_name}}/g, marker.user.screen_name)
                        .replace(/{{tweet_text}}/, marker.text
                            .replace(/(\b(https?):\/\/[A-Z0-9+.\/]*[A-Z0-9])/gim, '<a href="$1" target="_blank">$1</a>')
                            .replace(/@([A-Z0-9]+)/gim, '<a class="twitter-link" href="https://twitter.com/$1" target="_blank">@$1</a>')
                        )
                        .replace(/{{created_at}}/g, moment(marker.created_at).format('YYYY-MM-DD HH:mm'));

                    return content;
                };

                scope.$watch('markers', function(markers) {
                    container.objects.removeAll(_markers);

                    if (!markers || markers.length === 0) return;

                    _markers = createMarkers(markers);

                    container.objects.addAll(_markers);

                    $timeout(function(){
                        map.zoomTo(area.getBoundingBox());
                    }, 600);
                });

                scope.$watch('overlay', function(overlay) {
                    if(!overlay) return;

                    var conf = overlay.split(',');

                    area.set('center', new nokia.maps.geo.Coordinate(parseFloat(conf[0]), parseFloat(conf[1])));
                    area.set('radius', parseFloat(conf[2].replace('km', '')) * 1000);
                });
            }
        };
    };

    angular.module('app').directive('hereMaps', ['$timeout', HereMaps]);

});
