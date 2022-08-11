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

## Data:
* Import data from HSL .csv files to MySQL database.
* Validate data before importing:
  * Removed journeys that lasted less than 10 seconds
  * Removed journeys that covered distance shorter than 10 meters
  * Removed duplicate entries

## Under developement: 
* E2E Testing
* Cleaning CSS file

 ## Insctructions for local running:
 * Front End:
   * 'npm install' to install dependencies
   * 'npm start' to start 
   
* Back End:
  * Needs a running mySQL server (localhost by default, if using something else, change server host address to server\index.js) 
  * server in \src\server folder. 
  * create .env -file in server folder root and add your mySQL server username and password with variables MYSQL_USER and MYSQL_PASSWORD
  * local database name is by default 'helsinki_city_bike'
  * .sql file with validated data downloadable by request
  * Run back end with 'npm run devStart'
  * Front end is making axios requests to localhost:3301, make sure your back end is running at the same port or you need to change front end request url's. 
  

## Progress: 
* Front end and database are deployed and running in my web hotel
* Back end is deployed and running in Heroku.
* Build up and running in: https://kurpizza.testiosoite.com/hsl_city_bike


![HSL_citybike_1](https://user-images.githubusercontent.com/109145769/184131606-50b503f2-79fc-4f04-b240-deefa5f24341.jpg)
![HSL_citybike_2](https://user-images.githubusercontent.com/109145769/184131634-6052cf67-e0c1-486a-97b2-b63d3f23d593.jpg)
![HSL_citybike_3](https://user-images.githubusercontent.com/109145769/184131647-aac2e882-b830-4702-bc54-f6e171072443.jpg)
![HSL_citybike_4](https://user-images.githubusercontent.com/109145769/184131678-e5564f41-cbe4-48ba-a727-f7569483b2a8.jpg)
![HSL_citybike_5](https://user-images.githubusercontent.com/109145769/184131703-d15f006c-ddf3-459e-9258-b82caedae0fd.jpg)
![HSL_citybike_7](https://user-images.githubusercontent.com/109145769/184131773-82bec413-2446-4e68-b378-25a7e21ee52a.jpg)
![HSL_citybike_6](https://user-images.githubusercontent.com/109145769/184131782-115deff2-a5bc-458e-be3e-fe92e9f1fc7a.jpg)


