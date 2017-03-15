var express = require('express');

var app = express();



app.use(express.static(__dirname + '/angularjs'));


/* openshift configuration
 var ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
 var port = process.env.OPENSHIFT_NODEJS_PORT || 5000;

 app.listen(port,ip);
 */
app.set('port', (process.env.PORT || 5000));
app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});