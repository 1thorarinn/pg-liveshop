
// Basic dGhvcmFyaW5udEB0bXNvZnR3YXJlLmlzOkFDRW9mLi5TcGFkZSQx
// var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}};
/* $.ajax({
     url: 'http://tmstesting.wpengine.com/gravityformsapi/entries',
     method: 'GET',
     crossDomain: true,
     beforeSend: function ( xhr ) {
         xhr.setRequestHeader( 'Authorization', 'Basic ' + Base64.encode( 'thorarinnt@tmsoftware.is:ACEof..Spade$1' ) );
     },
     success: function( data, txtStatus, xhr ) {
         console.log( data );
         console.log( xhr.status );
     }
 }); */

// https://tmstesting.wpengine.com/gravityformsapi/forms/1/?api_key=2de39bca51&signature=butqCWKiepU8Ut8JX0tRc9hkSTo%3D&expires=1514907834


function CalculateSig(stringToSign, privateKey){
    //calculate the signature needed for authentication
    var hash = CryptoJS.HmacSHA1(stringToSign, privateKey);
    var base64 = hash.toString(CryptoJS.enc.Base64);
    return encodeURIComponent(base64);
}

//set variables
var d = new Date;
var expiration = 3600; // 1 hour,
var unixtime = parseInt(d.getTime() / 1000);
var future_unixtime = unixtime + expiration;
var publicKey = "2de39bca51";
var privateKey = "23a9f87d2f05224";
var method = "GET";
var route = "forms"; // var route = "forms/1000;1;14;28;29"; var route = "forms/1000;1;14;28;29";

var stringToSign = publicKey + ":" + method + ":" + route + ":" + future_unixtime;
sig = CalculateSig(stringToSign, privateKey);



// gravityformsapi/entries
// var url = 'http://tmstesting.wpengine.com/gravityformsapi/' + route + '/3/?api_key=' + publicKey + '&signature=' + sig + '&expires=' + future_unixtime;
var url = 'http://tmstesting.wpengine.com/gravityformsapi/entries?api_key=' + publicKey + '&signature=' + sig + '&expires=' + future_unixtime;
// alert(stringToSign);
// alert(url);

/*
beforeSend: function (xhr) {
xhr.setRequestHeader ("Authorization", "Basic " + btoa(username + ":" + password));
},
*/
//alert(window.btoa('thorarinnt@tmsoftware.is:ACEof..Spade$1'));
$.ajax({
    url: url,
    method: 'GET',
    crossDomain: true,

    //     context: document.body,
    beforeSend: function (xhr) {
        xhr.setRequestHeader ("Authorization", "Basic " + window.btoa('thorarinnt@tmsoftware.is:ACEof..Spade$1'));
    }
}).done(function(data) {
    //$( this ).addClass( "done" );
    document.write( 'There was an error attempting to access the API - ' + data.status + ': ' + data.response );

});

/* $.get(url, function(data, textStatus)
{
    //get the data from the api
    if ( data.status != 200 || ( typeof( data ) != 'object' ) ) {
        //http request failed
        document.write( 'There was an error attempting to access the API - ' + data.status + ': ' + data.response );
        return;
    }

    console.log(data);
 /*   forms         = data.response;
    document.write('<p>Results</p>');
    document.write('<table border="1"><th>Form ID</th><th>Form Title</th><th>Entry Count</th>');
    for (var form in forms) {
        document.write('<tr><td>' + forms[form]['id'] + '</td><td>' + forms[form]['title'] + '</td><td>' + forms[form]['entries'] + '</td></tr>');
    }
    document.write("</table>"); */

//        });

/*

var request = {
    url:  ' http://tmstesting.wpengine.com/gravityformsapi/forms/1/?',  // 'http://wp-liveshop.test/wp-json/wc/v2/orders',
    method: 'GET'
};

var oauth = new OAuth({
    consumer: {
        public: '2de39bca51',
        secret: '23a9f87d2f05224'
    },
    //oauth1.0a protocol signature method
    signature_method: 'HMAC-SHA1',
    hash_function: function(base_string, secret) {
        return CryptoJS.HmacSHA1(base_string, secret)
    }
});

var oauth_data = {
    api_key: oauth.consumer.public,
 //   oauth_nonce: oauth.getNonce(),
  //  signature: oauth.signature_method,

    expires: oauth.getTimeStamp("+60 mins")
};

//Oauth signature
oauth_data.signature =  oauthSignature.generate(request.method,request.url,
    oauth_data,oauth.consumer.secret );
//  console.log("Params : "+ JSON.stringify(oauth_data));



var request = $.ajax({
    url: request.url,
    method: request.method,
    data: oauth_data,
    dataType: "json"
});

request.done(function( msg ) {
    console.log(msg);
})

request.fail(function( jqXHR, textStatus ) {
    console.log(jqXHR);
    alert( "Request failed: " + textStatus);
});
*/