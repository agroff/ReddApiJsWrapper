/**
 * This HttpRequest object simply abstracts the actual HTTP request feature from the API Wrapper.
 * The purpose of this is to allow you to handle the request functionality however you like. This one
 * uses jQuery, but it could be nodeJS, vanilla JS, etc.
 *
 * Abstracting this also removes ReddApi.js's jQuery dependency
 */
(function($, exports){
    var pri = {},
        pub = {};

    pub.send = function(url, type, headers, data, success, error){
        var type = type || 'GET',
            data = data || false,
            request = {
                type    : type,
                url     : url,
                headers : headers,
                success : success,
                error   : error
            };

        if(data !== false){
            request.data = data;
        }

        $.ajax(request);
    }

    exports.HttpRequest = pub;

})(jQuery, exports);