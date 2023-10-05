const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');
const GitHubStrategy = require('passport-github').Strategy;
const session = require('express-session');
const axios = require('axios');

const User = require('./models/user');
const Repo = require('./models/repo');

const app = express();

// Enable CORS to allow cross-origin requests, necessary for the extension to communicate with the server.
app.use(cors());

const PORT = 3000;

// Connect to the MongoDB database.
mongoose.connect('mongodb://localhost/githubTracker', { useNewUrlParser: true, useUnifiedTopology: true });

// Set up the session for Passport. This will store user sessions between requests.
app.use(session({
    secret: 'some_secret',
    resave: false,
    saveUninitialized: true
}));

// Initialize Passport for authentication.
app.use(passport.initialize());
app.use(passport.session());

// Serialize and deserialize user instances to and from the session.
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

// Implement the GitHub OAuth strategy using Passport.
passport.use(new GitHubStrategy({
    clientID: '253ac42945389779284c',
    clientSecret: 'f2105f4912684983126162294e5d806c5cdae9de',
    callbackURL: "http://localhost:3000/auth/github/callback"
},
function(accessToken, refreshToken, profile, done) {
    // Check if user already exists in our MongoDB.
    User.findOne({ githubId: profile.id }, (err, existingUser) => {
        if (err) return done(err);
        
        // If user exists, proceed without creating a new entry.
        if (existingUser) {
            return done(null, existingUser);
        } else {
            // If user doesn't exist, create a new entry.
            const newUser = new User({
                githubId: profile.id,
                username: profile.username,
                name: profile.displayName
            });

            newUser.save(async (err) => {
                if (err) return done(err);

                if (err) return done(err);
                
                // Fetch user's public repos using the accessToken.
                try {
                    const response = await axios.get('https://api.github.com/user/repos', {
                        headers: {
                            'Authorization': `token ${accessToken}`
                        }
                    });

                    // Iterate over the repos and save them.
                    const repos = response.data;
                    for (let repo of repos) {
                        const newRepo = new Repo({
                            name: repo.name,
                            url: repo.html_url,
                            owner: newUser._id 
                        });
                        await newRepo.save();
                    }
                    
                } catch (error) {
                    console.error("Error fetching repos:", error);
                }
                
                return done(null, newUser);
                
            });
        }
    });
}));

// Start the GitHub OAuth process.
app.get('/auth/github', passport.authenticate('github'));

// Handle the callback after GitHub has authenticated the user.
app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/' }), (req, res) => {
    // Redirect user to the home page after successful authentication.
    res.redirect('/');
});

// Start the Express server.
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});