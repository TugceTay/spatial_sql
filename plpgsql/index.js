require('dotenv').config();


/*
// JSON
const express = require ("express")
const bodyParser = require( 'body-parser');
const db = require("./queries")

const app = express();
const port = 3000;

app.use (bodyParser. json());
app.use(
bodyParser.urlencoded ({
extended: true
}))

app.get('/', (request, response) => {
    response.json({info : "service running"})
})


app.get('/rows', db.getAsRows);



app. listen(port, () => {
console. log( "service running on port" + port)
});  
*/



//GeoJson 
const express = require ("express")
const bodyParser = require( 'body-parser');
const cors = require('cors');
const helmet = require('helmet');
const db = require("./queries")

const app = express();
const port = 3000;


app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (request, response) => {
    response.json({info : "service running"})
})

app.get('/geojson', db.getAsGeojson);

app. listen(port, () => {
console. log( "service running on port" + port)
}); 