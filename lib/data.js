/*
 * @module
 * @description
 * Wistia Data API => https://wistia.com/doc/data-api
 */

var request = require('request');

module.exports = function (apiKey, options) {

    var _buildQuery, _sendRequest, WistiaData;

    options.api_url = options.apiBaseUrl || 'https://api.wistia.com/';

    WistiaData = {

        /*
         * @param Callback {any}
         */
        accountRead: function (cb) {

            _buildQuery('account', null, function (error, data) {

                return cb(error, data);

            });

        },

        /*
         * @param Callback {any}
         */
        accountStats: function (cb) {

            _buildQuery('stats/account', null, function (error, data) {

                return cb(error, data);

            });

        },

        /*
         * @param Event Key {String}
         * @param Callback {any}
         */
        eventRead: function (key, cb) {

            _buildQuery('events', {event_key: key}, function (error, data) {

                return cb(error, data);

            });

        },

        /*
         * @param Project hash id {String}
         * @param Callback {any}
         */
        projectShow: function (project_hash_id, cb) {

            _buildQuery('projects/' + project_hash_id, {}, function (error, data) {

                return cb(error, data);

            });

        },

        /*
         * @param Project data {Object}
         * @param Callback {any}
         */
        projectCreate: function (project_data, cb) {

            _buildQuery('projects', project_data, function (error, data) {

                return cb(error, data);

            });

        },

        /*
         * @param Callback {any}
         */
        projectList: function (cb) {

            _buildQuery('projects', {}, function (error, data) {

                return cb(error, data);

            });

        },

        /*
         * @param Project ID {String}
         * @param Update project Data {Object}
         * @param Callback {any}
         */
        projectUpdate: function (project_id, project_data, cb) {

            _buildQuery('projects/' + project_id, project_data, function (error, data) {

                return cb(error, data);

            });

        },

        /*
         * @param Media ID {String}
         * @param Callback {any}
         */
        mediaShow: function (media_id, cb) {

            _buildQuery('medias/' + media_id, {}, function (error, data) {

                return cb(error, data);

            });

        },

        /*
         * @param Media ID {String}
         * @param Callback {any}
         */
        mediaShowStats: function (media_id, cb) {

            _buildQuery('medias/' + media_id + '/stats', {}, function (error, data) {

                return cb(error, data);

            });

        },

        /*
         * @param Media ID {String}
         * @param Update media Data {Object}
         * @param Callback {any}
         */
        mediaUpdate: function (media_id, new_media_data, cb) {

            _buildQuery('medias/' + media_id, new_media_data, function (error, data) {

                return cb(error, data);

            });

        },

        /*
         * @param Media Hash ID {String}
         * @param Callback {any}
         */
        mediaDelete: function (media_hash_id, cb) {

            _buildQuery('medias/' + media_hash_id, {_method: 'delete'}, function (error, data) {

                return cb(error, data);

            });

        },

        /*
         * @param Project ID {String}
         * @param Page no {Int}
         * @param Per Page {Int}
         * @param Callback {any}
         */
        mediaList: function (project_id, page, per_page, cb) {

            var params = {};

            if (project_id) {

                params.project_id = project_id;

            }

            if (page) {

                params.page = page;

            }

            if (per_page) {

                params.per_page = per_page;

            }

            _buildQuery('medias', params, function (error, data) {

                return cb(null, data);

            });

        }

    },

        /*
         * @param API endopint {String}
         * @param Params {Object}
         * @param Callback {any}
         */
        _buildQuery = function (endPoint, params, cb) {

            //build url
            var url = options.api_url + options.version + '/' + endPoint + "." + options.format;

            url += "?" + "api_password=" + apiKey + "&";

            //Set params
            if (params) {

                var paramKeys = Object.keys(params);

                if (paramKeys.length > 0) {

                    for (var key in paramKeys) {

                        url += paramKeys[key] + "=" + params[paramKeys[key]] + "&";

                    }

                }

            }

            _sendRequest(encodeURI(url), cb);

        },

        /*
         * @param API url {String}
         * @param Callback {any}
         */
        _sendRequest = function (url, cb) {

            request(url, function (error, response, body) {

                if (error) {

                    return cb(error);

                }

                return cb(null, body);

            })

        }

    return WistiaData;

};
