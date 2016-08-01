var assert = require("assert");
var supertest = require('supertest');
var app = require("../app.js");

var request = supertest(app), currentYear;

describe("Mongodb profile routes", function() {

  before(function(done){
    //setProfilingLevel and findOne
    request.get("/")
      .expect(200)
      .end(done);

    currentYear = (new Date()).getFullYear();
  });

  describe("daily profile", function() {
    it("should return status code 200", function(done){
      request.get("/day/")
        .expect(200)
        .end(done);
    });

    it("should return result grouped by day", function(done){
      request.get("/day/")
        .end(function(err, res){
          assert.ok(res.body.profiles.length && res.body.profiles[0]._id.date.day);
          done();
        })
    });
    it("should return result in current year", function(done){
      request.get("/day/" + currentYear)
        .end(function(err, res){
          if(res.body.profiles.length && res.body.profiles[0]._id.date.year){
            assert.equal(res.body.profiles[0]._id.date.year, currentYear);
            done();
          }
        });
    });

  });

  describe("weekly profile", function() {
    it("should return status code 200", function(done){
      request.get("/week")
        .expect(200)
        .end(done);
    });
    it("should return result grouped by week", function(done){
      request.get("/week")
        .end(function(err, res){
          assert.ok(res.body.profiles.length && res.body.profiles[0]._id.date.week);
          done();
        })
    });
    it("should return result in current year", function(done){
      request.get("/week/" + currentYear)
        .end(function(err, res){
          if(res.body.profiles.length && res.body.profiles[0]._id.date.year){
            assert.equal(res.body.profiles[0]._id.date.year, currentYear);
            done();
          }
        });
    });
  });

  describe("monthly profile", function() {
    it("should return status code 200", function(done){
      request.get("/month")
        .expect(200)
        .end(done);
    });
    it("should return result grouped by month", function(done){
      request.get("/month")
        .end(function(err, res){
          assert.ok(res.body.profiles.length && res.body.profiles[0]._id.date.month);
          done();
        })
    });
    it("should return result in current year", function(done){
      request.get("/month/" + currentYear)
        .end(function(err, res){
          if(res.body.profiles.length && res.body.profiles[0]._id.date.year){
            assert.equal(res.body.profiles[0]._id.date.year, currentYear);
            done();
          }
        });
    });
  });

  describe("yearly profile", function() {
    it("should return status code 200", function(done){
      request.get("/year")
        .expect(200)
        .end(done);
    });
    it("should return result grouped by year", function(done){
      request.get("/year")
        .end(function(err, res){
          assert.ok(res.body.profiles.length && res.body.profiles[0]._id.date.year);
          done();
        })
    });
    it("should return result in current year", function(done){
      request.get("/year/" + currentYear)
        .end(function(err, res){
          if(res.body.profiles.length && res.body.profiles[0]._id.date.year){
            assert.equal(res.body.profiles[0]._id.date.year, currentYear);
            done();
          }
        });
    });
  });
});