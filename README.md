# node-restful-api-playground
A set of restful api built on node + express, reading Mongodb profile, return average response milliseconds of day / week / month / year, in json format.

## install and test
- git clone, and npm install
- to run: ` npm start`
- to test: ` npm test `

## api list
- "/": set profiling level to all, and then find one
- "/day/:year?": get profiles grouped by day, year optional, default to be current year
- "/week/:year?": by week
- "/month/:year?": by month
- "/year/:year?": by year

## sample return
"/day":

	{
	  "message": "success",
	  "profiles": [
	    {
	      "_id": {
	        "date": {
	          "day": "2016-07-31",
	          "year": 2016
	        }
	      },
	      "millis_avg": 0.1111111111111111
	    },
	    {
	      "_id": {
	        "date": {
	          "day": "2016-08-01",
	          "year": 2016
	        }
	      },
	      "millis_avg": 0.018867924528301886
	    }
	  ]
	}
