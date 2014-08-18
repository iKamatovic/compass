Compass
=======
*Checkout tweets around you!*

##Requirements:
* NodeJS (tested with v0.10.30)
* Redis (tested with v2.8.4)

##Usage:
* Start redis server `redis-server` (Compass is configured to work with default redis config)
* From application folder run `npm install`
* From application folder run `npm start`
* Compass should be accessible via http://localhost:3000

##API:
At the moment only tweets fetching is possible via two REST endpoints:
* `/api/tweets/:latitude/:longitude` - where time limit is set to be 24h from the time when request is made
* `/api/tweets?until={YYYY-MM-DD HH:mm}&geocode={latitude,longitude,radius}` - same defaults like in previous API endpoint

##TODO:
* Refactoring of current code
* Use for default coordinates users current position
* Give a chance to Streaming API
* Add code comments
* Improve documentation