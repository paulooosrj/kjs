const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'vendor')));
app.set('views', __dirname + '/views');

app.get('/', (req, res) => {
	res.sendFile(app.get('views') + '/teste.html');
});

app.listen(5000, function(){
	console.log("On in port: 5000");
});