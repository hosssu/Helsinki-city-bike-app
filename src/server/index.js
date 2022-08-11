const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express();
const mysql = require('mysql');
require('dotenv').config();

const user = process.env.MYSQL_USER;
const password = process.env.MYSQL_PASSWORD;

const connection = mysql.createConnection({
    host: "localhost",
    user: user,
    password: password,
    database: "helsinki_city_bike"
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

app.get('/get/journeys', (req, res) => {
    var day = req.query.day;
    if (day < 10) {
        var day = 0 + day
    };
    month = req.query.month;
    if (month == 'May') { month = 5 }
    else if (month == 'June') { month = 6 }
    else { month = 7 };
    const year = '\`2021-0'
    const table = year + month + '\`'
    const date_year = '\'2021-0'
    const date = date_year + month + '-' + day + '\''
    const Departure = '`Departure`'
    const sqlGet = `SELECT * FROM ${table} WHERE DATE(${Departure}) = DATE(${date}) ORDER BY id DESC`
    connection.query(sqlGet, (err, result) => {
        res.send(result)
        //console.log(err)
    });
});

app.get('/get/stations', (req, res) => {
    const sqlGet = 'SELECT * FROM helsinki_city_bike.stations ORDER BY `station_id` ASC'
    connection.query(sqlGet, (err, result) => {
        res.send(result)
        console.log(err)
    })
})

app.get('/get/allstations', (req, res) => {
    id = req.query.station_id;
    const table1 = '`2021-05`';
    const table2 = '`2021-06`';
    const table3 = '`2021-07`';
    Departure = '`Departure_station_id\`';
    Return = '`Return_station_id`';
    const sqlGet = `SELECT * FROM ${table1} WHERE ${Departure} = ${id} OR ${Return} = ${id} UNION ALL SELECT * FROM ${table2} WHERE ${Departure} = ${id} OR ${Return} = ${id} UNION ALL SELECT * FROM ${table3} WHERE ${Departure} = ${id} OR ${Return} = ${id}`
    connection.query(sqlGet, (err, result) => {
        res.send(result)
        console.log(err)
    })
})

app.get('/get/station', (req, res) => {
    id = req.query.station_id;
    month = req.query.month;
    if (month == 'May') { month = 5 }
    else if (month == 'June') { month = 6 }
    else { month = 7 }
    Departure = '`Departure_station_id\`';
    Return = '`Return_station_id`';
    table = '`2021-0' + month + '`';
    const sqlGet = `SELECT * FROM ${table} WHERE ${Departure} = ${id} OR ${Return} = ${id}`
    connection.query(sqlGet, (err, result) => {
        res.send(result)
        console.log(err)
    })
})

app.post('/post/journey', (req, res) => {
    var day = req.body.day;
    if (day < 10) {
        var day = '0' + day;
    };
    month = req.body.month;
    if (month == 'May') { month = 5 }
    else if (month == 'June') { month = 6 }
    else { month = 7 };
    departureId = req.body.departureId;
    departureStation = req.body.departure;
    returnStation = req.body.return;
    returnId = req.body.returnId;
    distance = parseInt(req.body.distance);
    departureDate = '2021-0' + month + '-' + day + 'T' + req.body.departureTime + ':00';
    returnDate = '2021-0' + month + '-' + day + 'T' + req.body.returnTime + ':00';
    duration = req.body.duration;
    table = '`2021-0' + month + '`';
    const sqlPost = `INSERT INTO ${table} (Departure, ReturnDate, Departure_station_id, Departure_station_name, Return_station_id, Return_station_name, Covered_distance, Duration) VALUES (?,?,?,?,?,?,?,?)`
    connection.query(sqlPost, [departureDate, returnDate, departureId, departureStation, returnId, returnStation, distance, duration], (err, result) => { console.log(err, result) })
})

app.post('/post/station', (req, res) => {
    const station_id = req.body.stationId
    const stationName = req.body.stationName;
    const stationAddress = req.body.stationAddress;
    const stationCity = req.body.stationCity
    const x = req.body.x;
    const y = req.body.y;
    const sqlPost = 'INSERT INTO `stations` (station_id, Nimi, Namn, Name, Osoite, Adress, Kaupunki, x, y) VALUES (?,?,?,?,?,?,?,?,?)'
    connection.query(sqlPost, [station_id, stationName, stationName, stationName, stationAddress, stationAddress, stationCity, x, y], (err, result) => { console.log(err, result) })
})



const PORT = process.env.PORT || 3301
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})