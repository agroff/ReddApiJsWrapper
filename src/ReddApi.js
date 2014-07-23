(function(HttpRequest, exports){
    var pri = {
            postKey : false,
            getKey  : false,
            baseUrl : 'https://api.reddapi.com',
            errorHandler : function(){}
        },
        pub = {};

    pri.isFunction = function(functionToCheck) {
        var getType = {};
        return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
    };

    pri.apiRequestPost = function(method, data, callback){
        data.APIKey = pri.postKey;

        pri.apiRequest(method, data, callback, 'POST');
    };

    pri.apiRequestGet = function(method, username, callback){
        //for requests where username isn't required, we'll shift the parameters around so that the
        //second argument is the callback, and username is an empty string.
        if(pri.isFunction(username)){
            callback = username;
            username = "";
        }

        if(username !== ''){
            username = '/' + username;
        }

        method = method + '/' + pri.getKey + username;

        pri.apiRequest(method, {}, callback);
    };

    pri.apiRequest = function(method, data, success, type){
        var type = type || 'GET',
            url = pri.baseUrl + '/v1/json/' + method,
            headers = {
                "Content-Type":"application/json"
            };

        if(typeof data.APIKey !== "undefined"){
            data = JSON.stringify(data);
        }
        else {
            data = false;
        }

        HttpRequest.send(url, type, headers, data, success, pri.errorHandler);
    };

    /******************************************
     * Begin Setters
     ******************************************/

    pub.setPostKey = function(postKey){
        pri.postKey = postKey;
    };

    pub.setGetKey = function(getKey){
        pri.getKey = getKey;
    };

    pub.setBaseUrl = function(baseUrl){
        pri.baseUrl = baseUrl;
    };

    pub.setErrorHandler = function(errorHandler){
        pri.errorHandler = errorHandler;
    };


    /******************************************
     * Begin API Methods
     ******************************************/

    pub.CreateNewUser = function(username, callback){
        var data = { Username: username };
        pri.apiRequestPost('CreateNewUser', data, callback);
    };

    pub.SendToAddress = function(fromUsername, toAddress, coinAmount, callback){
        var data = {
            UsernameFrom : fromUsername,
            AddressTo    : toAddress,
            Amount       : coinAmount
        };
        pri.apiRequestPost('SendToAddress', data, callback);
    };

    pub.MoveToUser = function(fromUsername, toUsername, coinAmount, callback){
        var data = {
            UsernameFrom : fromUsername,
            UsernameTo   : toUsername,
            Amount       : coinAmount
        };
        pri.apiRequestPost('MoveToUser', data, callback);
    };

    pub.GetUserList = function(callback){
        pri.apiRequestGet('GetUserList', callback);
    };

    pub.GetUserInfo = function(username, callback){
        pri.apiRequestGet('GetUserInfo', username, callback);
    };

    pub.GetUserBalance = function(username, callback){
        pri.apiRequestGet('GetUserBalance', username, callback);
    };

    pub.GetUserBalanceDetail = function(username, callback){
        pri.apiRequestGet('GetUserBalanceDetail', username, callback);
    };

    if ( typeof define === "function" && define.amd) {
        define( "ReddApi", ["jquery"], function () { return pub; } );
    }

    exports.ReddApi = pub;
})(exports.HttpRequest, exports);