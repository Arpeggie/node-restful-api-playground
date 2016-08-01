var _ = require('lodash');
var MongoClient = require('mongodb').MongoClient;
var config = require("../config/config");
var db;

module.exports = function(app){

  MongoClient.connect(config.connectionString, function(err, database){
    if(err){
      console.log(err);
      return;
    }

    db = database;
  });

  app.get('/', function(req, res, next) {
    //set profiling level to all
    db.command({ profile : 2 }, function(err, result){
      console.log(result);
    });

    db.collection("system.profile").find().limit(1).toArray(function(err, doc){
      if(err){
        return next(err);
      }
      res.json({
        "message": "set profiling level to all, and then find one",
        "profiles": doc
      });
    });

  });

  app.get("/day/:year?", function(req, res, next){
    var targetYear = +req.params.year || (new Date()).getFullYear();

    db.collection("system.profile") .aggregate([
      { "$match":
          { "$and":
              [
                { "ts": { "$gte": new Date(targetYear, 0, 1) }},
                { "ts": { "$lte": new Date(targetYear + 1, 0, 1) }}
              ]
          }
      },
      {"$group": {
        "_id":  {"date" : {
          day: { $dateToString: { format: "%Y-%m-%d", date: "$ts" } } ,
          year: {"$year": "$ts"}
        }},
        "millis_avg": { "$avg": "$millis" }
      }
      }
    ]).toArray(function(err, result){
      if(err){
        return next(err);
      }
      res.json({
        "message": "success",
        "profiles": result
      });
    });

  });

  app.get("/week/:year?", function(req, res, next){
    var targetYear = +req.params.year || (new Date()).getFullYear();

    db.collection("system.profile").aggregate([
      { "$match":
      { "$and":
        [
          { "ts": { "$gte": new Date(targetYear, 0, 1) }},
          { "ts": { "$lte": new Date(targetYear + 1, 0, 1) }}
        ]
      }
      },
      {"$group": {
        "_id":  {"date" : {
          week: {"$week": "$ts"},
          year: {"$year": "$ts"}
        }},
        "millis_avg": { "$avg": "$millis" }
      }}
    ]).toArray(function(err, result){
      if(err){
        return next(err);
      }
      res.json({
        "message": "success",
        "profiles": result
      });
    });

  });

  app.get("/month/:year?", function(req, res, next){
    var targetYear = +req.params.year || (new Date()).getFullYear();

    db.collection("system.profile").aggregate([
      { "$match":
      { "$and":
          [
            { "ts": { "$gte": new Date(targetYear, 0, 1) }},
            { "ts": { "$lte": new Date(targetYear+1, 0, 1) }}
          ]
      }
      },
      {"$group": {
        "_id":  {"date" : {
          month: {"$month": "$ts"},
          year: {"$year": "$ts"}
        }},
        "millis_avg": { "$avg": "$millis" }
      }}
    ]).toArray(function(err, result){
      if(err){
        return next(err);
      }
      res.json({
        "message": "success",
        "profiles": result
      });
    });

  });

  app.get("/year/:year?", function(req, res, next){
    var targetYear = +req.params.year || (new Date()).getFullYear();

    db.collection("system.profile").aggregate([
      { "$match":
      { "$and":
          [
            { "ts": { "$gte": new Date(targetYear, 0, 1) }},
            { "ts": { "$lte": new Date(targetYear + 1, 0, 1) }}
          ]
      }
      },
      {"$group": {
        "_id":  {"date" : {
          year: {"$year": "$ts"}
        }},
        "millis_avg": { "$avg": "$millis" }
      }}
    ]).toArray(function(err, result){
      if(err){
        return next(err);
      }
      res.json({
        "message": "success",
        "profiles": result
      });
    });

  });

};