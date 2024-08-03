const passport =require("passport");
const LocalStrategy =require("passport-local").Strategy ;
const Person =require('./models/person');

passport.use(new LocalStrategy(async(username, password, done) => {

    try{


        var person = await Person.findOne({username:username});

        if(!person){
            return done(null,false,{"message":"User not found"});
        }
        if(person.comparePassword(password)===false){
            return done(null,false,{"message":"Password incorrect"});
        }
        return done(null,person,{"message":"Login successful"});

    }catch(e){
        console.log(e.message);
        done(e);
    }

}
    ));

    module.exports=passport; 