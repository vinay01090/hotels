const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Person = require('./models/person.js');


passport.use(new LocalStrategy(async(username,password,done)=>{
    //authentication logic here

    try {
        console.log('Received credendials:',username,password);
        const user = await Person.findOne({username});
        if(!user){
            console.log(user); 
            return done(null,false,{message:'Incorrect username'});
        }

        const isPasswordMatch =await user.comparePassword(password);
        if (isPasswordMatch){

            return done(null,user);
        }
        else{

            return done(null,false,{message:"Incorrect password"});
        }

    } catch (err) {
        return done(err);
    }
}));

module.exports = passport;