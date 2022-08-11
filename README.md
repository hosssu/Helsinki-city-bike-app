# Helsinki city bike App

# Features: 

## Journey view:
  
  * Date selection
   * Pagination
   * Each journey shows the date of travel, departure and return station, distance in kilometers and duration in minutes
  * Filtering results to show different amount of results / page
* Filtering the results by single station (departure or return)
* Filtering the results in ascending or descending order by city, station, distance or duration.
* Possibility to add new custom city bike journeys


## Station list view:
* Search for a station name (finnish or swedish) or by city
* List all stations
* Select a station from list and view more info
* Shows selected station as text and active color before proceeding to view more info
* Possibility to add new city bike stations

## Single station view: 
* Shows station name and address
* Total number of journeys departing and returning to station and ability to filter results monthly
* Average distance of journeys departing and returning to station and ability to filter results monthly
* Shows station position on map
* Uses HSL open real-time GraphQL service to show available city bikes in current station and empty return positions.

## Database: mySQL
Validate data before importing:
* Removed journeys that lasted less than 10 seconds
* Removed journeys that covered distance shorter than 10 meters
* Removed duplicate entries

## Progress: 
* Front end created using React
* Back end created using Node.Js Express
* Front end and database are deployed and running in my web hotel
* Back end is deployed and running in Heroku.
* Build up and running in: https://kurpizza.testiosoite.com/hsl_city_bike


## Under developement: 


 ## Insctructions for local running: 
 * mySQL server (localhost by default)
 * 'npm start' for the front end. 
* Back end server in \src\server folder. 
  * Add your mySQL server username and password in .env -file in server folder root, with variables MYSQL_USER=*your database username* and MYSQL_PASSWORD=*you database password*
  * local database name is by default 'helsinki_city_bike'
  * .sql file downloadable by request
  * Run back end with 'npm run devStart'

