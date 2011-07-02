
// http://192.168.0.100:2010/cgi-bin/WebObjects/MobileNotesSync.woa
var SVC = {
    protocol: "http",
    port: 2010,
    host: "localhost",
	uri: "/cgi-bin/WebObjects/MobileNotesSync.woa/sync/register/update",
	junk: "register/check"
};

var AUTH = {
    user: "",
    pword: ""
};

importPackage(
	org.apache.http.impl.client,
	org.apache.http.client.methods,
    org.apache.commons.httpclient.methods,
	org.apache.http.client.entity,
	org.apache.http.client.utils,
	org.apache.http.message,
	org.apache.http.protocol,
    org.apache.http.params,
	org.apache.http.util
);
importPackage(
    java.util,
    java.io
);

var properties = LoadProperties( "scripts/sync", "ersync.properties" );
var protocol = properties.getProperty("protocol");
var host = properties.getProperty("host");
var port = properties.getProperty("port");
var uri = properties.getProperty("uri");
var user = properties.getProperty("username");
var pword = properties.getProperty("password");
var device = properties.getProperty("deviceUUID");
var verbose = (properties.getProperty("verbose") == 'true');;

var source = ReadFile( "scripts/sync/", "sync0.xml" );
source = source.replace( "#USER#", user + "bad" );
source = source.replace( "#PASSWORD#", pword );
source = source.replace( "#DEVICEUUID#", device );

if ( verbose ) println( source );

var httpclient = new DefaultHttpClient();
var url = URIUtils.createURI( protocol, host, port, uri + "/sync/register/new", null, null);
var authpost = new HttpPost(url);
authpost.setEntity(new org.apache.http.entity.StringEntity(source, "text/xml", "UTF-8") );

response = httpclient.execute(authpost);

var str = EntityUtils.toString(response.getEntity());
if ( verbose ) println( str );

