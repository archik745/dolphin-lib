/**
 * Created by petervandeput on 16/10/2015.
 */
'use strict';
var Q = require('q');

function GeoDistance(apiKey) {
    this.service = require('google-distance');
    this.service.apiKey = apiKey;
}

GeoDistance.prototype.getDistance = function (fromLat, fromLon, toLat, toLon, units, mode) {
    units = units || 'imperial';
    mode = mode || 'driving';

    if (fromLat === undefined || fromLon === undefined || toLat === undefined || toLon === undefined) {
        return Q.reject(new Error('Wrong incoming parameters'));
    }

    var deferred = Q.defer();
    var fromLocation = fromLat.toString() + ',' + fromLon.toString();
    var toLocation = toLat.toString() + ',' + toLon.toString();
    this.service.get({
        index: 1,
        origin: fromLocation,
        destination: toLocation,
        units: units,
        mode: mode
    }, function (err, result) {
        if (err) {
            return deferred.reject(err);
        }

        return deferred.resolve(result);
    });
    return deferred.promise;
};


// export the class
module.exports = GeoDistance;