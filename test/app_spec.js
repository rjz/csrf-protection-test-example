var cheerio = require('cheerio')

var Session = require('supertest-session')({
  app: require('../app.js')
});

function extractCsrfToken (res) {
  var $ = cheerio.load(res.text);
  // your selector may vary
  return $('input').val();
}

describe('POST /register', function () {

  var session;

  beforeEach(function () {
    session = new Session();
  });

  describe('with no CSRF token', function () {
    it('should be unauthorized', function (done) {
      session
        .post('/register')
        .expect(403)
        .end(done)
    });
  });

  describe('when valid CSRF token is provided', function () {
    var csrfToken;

    beforeEach(function (done) {
      session.get('/register')
        .end(function (err, res) {
          if (err) return done(err);
          csrfToken = extractCsrfToken(res);
          done();
        });
    });

    it('should accept the result', function (done) {
      session
        .post('/register')
        .send({ _csrf: csrfToken })
        .expect(201)
        .end(done)
    });

  });
});

