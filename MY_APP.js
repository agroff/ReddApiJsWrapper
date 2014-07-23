
/*************************************************************************
 * Welcome to the usage example. At this stage, we've already created a
 * new namespace in initialize.js, then we included HttpRequest.js,
 * which handles ajax requests. Then we included ReddApi.js, the API
 * wrapper, and passed in the ajax handler, as well as the namespace
 * it attached itself to.
 *
 * The API is now usable at MY_APP.ReddApi
 *
 * Enjoy!
 *************************************************************************/
ItAllBeginsHere = function(){
    //obligatory
    consoleOut("Hello, World.");

    //First, enter your API Keys here.
    MY_APP.ReddApi.setPostKey('YOUR_POST_KEY');
    MY_APP.ReddApi.setGetKey('YOUR_GET_KEY');


    //You can set an error handler to handle errors, but you don't have to.
    MY_APP.ReddApi.setErrorHandler(printError);

    //This lets you override the base url. Normally it will talk to ReddAPI Directly, but
    // if you want to run it through a proxy you can. This line runs it through the included PHP proxy if uncommented
    //MY_APP.ReddApi.setBaseUrl('proxy.php?url=https://api.reddapi.com');

    //We're done with the initial load. Now we'll just bind the buttons that will get clicked later.
    doBindings();
};

//Gets called when the Create Users button is clicked.
listUsers   = function(){
    consoleOut("Getting User List...");
    MY_APP.ReddApi.GetUserList(GetUserListCallback);
}

//Gets called when the Create Users button is clicked.
createUsers   = function(){
    consoleOut("Creating first user.");
    MY_APP.ReddApi.CreateNewUser("TestUserOne", UserCreatedCallback);

    //we'll set a delay for creating the second user.
    setTimeout(function(){

        consoleOut("Creating second user.");
        MY_APP.ReddApi.CreateNewUser("TestUserTwo", UserCreatedCallback);

    }, 6000);
};

//Gets called when the button is clicked
checkBalances = function(){

    consoleOut("Checking TestUserOne's balance.");

    MY_APP.ReddApi.GetUserBalanceDetail("TestUserOne", function(response){
        UserBalanceCallback(response);

        //we'll check the second one right after we got the response for the first one.
        consoleOut("Checking TestUserTwo's balance.");

        MY_APP.ReddApi.GetUserBalanceDetail("TestUserTwo", UserBalanceCallback);
    });
};

transferCoins = function(){
    var u1 = 'TestUserOne',
        u2 = 'TestUserTwo',
        amount = 50;

    consoleOut("Moving "+amount+" coins from "+u1+" to "+u2+".");

    MY_APP.ReddApi.MoveToUser(u1, u2, amount, function(){
        consoleOut(amount + " RDD Successfully Moved from "+u1+" to "+u2+".");
    });
};

withdrawCoins = function(){
    var u2      = 'TestUserTwo',
        address = 'RfUt4Ky7K8fFZS3VhwziHxhJT4f4HxmhAD',
        amount  = 50;

    consoleOut("Sending "+amount+" coins from "+u2+" to "+address+".");

    MY_APP.ReddApi.SendToAddress(u2, address, amount, function(transactionId){
        consoleOut(amount + " RDD Successfully sent from "+u2+" to "+address+".");
        consoleOut("Transaction: " + transactionId);
    });
};

doBindings = function(){
    //bind all the buttons
    $("#listUsers").click(listUsers);
    $("#createUsers").click(createUsers);
    $("#checkBalances").click(checkBalances);
    $("#transferCoins").click(transferCoins);
    $("#withdrawCoins").click(withdrawCoins);

    //don't mind this, its just for display purposes.
    $(window).resize(fixConsole);
    fixConsole();
};


GetUserListCallback = function(response){
    consoleOut("Got it!");
    $.each(response, function(i, item){
        consoleOut("User " + i + ": " + item.Username);
        consoleOut("Address: " + item.DepositAddress);
    });

    if(response.length === 0){
        consoleOut("You don't have any users yet, but the API works!");
    }

    consoleOut("________________DONE_________________");
};


UserCreatedCallback = function(response){
    consoleOut("Created User: " + response.Username);
    consoleOut("Address: "      + response.DepositAddress);
}

UserBalanceCallback = function(response){
    consoleOut("Confirmed Balance: " + response.ConfirmedBalance);
    consoleOut("Pending: " + response.PendingDeposits);
};

//when the document is ready, we get started.
$(ItAllBeginsHere);




/*****************************************************
 * Just some helper functions. Don't mind these.
 *****************************************************/

function dbg(i){
    console.log(i);
}
function consoleAppend(html){
    var $console = $("#outputConsole");
    //for whatever reason my IDE expects two parameters here.
    $console.append(html, "");
    $console.scrollTop( $console.prop("scrollHeight") - $console.height() );
}

function consoleObject(obj){
    dbg(obj);
    return consoleAppend(prettyPrint(obj));
}

function consoleOut(text){
    consoleAppend("<p>" + text + "</p>");
}

function consoleError(text){
    consoleAppend("<p class=\"error\">" + text + "</p>");
}

function printError( jqXHR, textStatus, errorThrown){
    dbg(jqXHR);
    consoleError("Error: " + jqXHR.status + " " + errorThrown);
    if(jqXHR.responseJSON && jqXHR.responseJSON.ErrorMessage){
        consoleError('Message: ' + jqXHR.responseJSON.ErrorMessage);
    }
    if(jqXHR.status === 0){
        consoleError("It looks like the same origin policy is preventing this request. Turn it off or use the provided PHP proxy.");
    }
}

function fixConsole(){
    $("#console").width($("#console").parent().width() - 40);
}

