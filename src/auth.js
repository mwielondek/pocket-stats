import {app, express} from './index';

const passport = require('passport');
const PocketStrategy = require('passport-pocket');
const session = require('express-session');

const CONSUMER_KEY = "64614-1a557559fbd5ba7f0c1f79e5";


// TODO change secret before going into productino
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());

// Passport Set serializers
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

// Passport Set up
let pocketStrategy = new PocketStrategy({
		consumerKey    : CONSUMER_KEY,
    // TODO dont hardcode url and port
		callbackURL    : "http://127.0.0.1:8080/auth/pocket/callback"
	},function(username, accessToken, done) {
		process.nextTick(function () {
			return done(null, {
				username    : username,
				accessToken : accessToken
			});
		});
	}
);

passport.use(pocketStrategy);


// Passport routes for express
app.get('/auth/pocket', passport.authenticate('pocket'),
function(req, res){
    // If user is already log in and this url is called please readirect the user to the correct place.
    res.redirect('/');
});

app.get('/auth/pocket/callback', passport.authenticate('pocket', { failureRedirect: '/login' }),
function(req, res) {
    res.redirect('/');
});

app.get('/logout', function(req, res){
	req.session.destroy();
	res.redirect('/');
});
