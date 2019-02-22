  // load require package
  var http=require("http");
  var fs=require("fs");
  var express= require("express");
  var mongoose=require("mongoose");
  var cors=require("cors");
  var jwt=require("jsonwebtoken");
  var path=require("path");
  var bodyParser=require("body-parser");
  mongoose.Promise=global.Promise;
  var instance= express()
  var router = express.Router();
  
  
  
  // configure middleware
  instance.use(bodyParser.urlencoded({extended: false}));
  instance.use(router);
  instance.use(bodyParser.json());
  instance.use(cors());
  
  // connect to database
  mongoose.connect("mongodb://localhost/InfoDb",
                 { useNewUrlParser :true}
                 
  );
  
  
  var dbconnect=mongoose.connection;
  
  if(!dbconnect){
      console.log("Sorry cannot establish the connection");
      return;
  }
  else{
      console.log("Connection established");
  }
  
  instance.listen(4080, function(){
      console.log("Server started at 4080");
  });       
  
  //User Schema
  var userSchema= mongoose.Schema({
      UserId: String,
      Username: String,
      EmailAddr: String,
      Password:  String,
      RoleId: String,
      IpAddress: String
  });
  var roleSchema=mongoose.Schema({
          RoleId: String,
          RoleName: String,
          RoleStatus: String
      }
  )
  var userPermanentSchema= mongoose.Schema({
    UserId: String,
    Username: String,
    EmailAddr: String,
    Password:  String,
    RoleId: String
});
  
  var userModel=mongoose.model('Users', userSchema,'Users');
  var roleModel=mongoose.model('Roles', roleSchema,'Roles');
  var userPermanentModel=mongoose.model('UserPermenant', userPermanentSchema,'UserPermenant');
  // Create a new user
  instance.post("/api/users/create", function(request, response){
    const ip =
    request.headers["x-forwarded-for"] ||
    (request.connection && request.connection.remoteAddress) ||
    "";
      var user={
          UserId : request.body.UserId,
          Username : request.body.Username,
          EmailAddr : request.body.EmailAddr,
          Password : request.body.Password,
          RoleId : request.body.RoleId,
          IpAddress: ip
      };
  
      userModel.create(user, function(err, res){
          if(err)
          {
            //   response.statusCode=500;
            //   response.send({statusCode: response.statusCode, message:err});
            throw error;
          }
          response.send({status:200, data: res});
      });
  });

  instance.post("/api/users/create/permanent", function(request, response){
    var users={
        Username : request.body.Username,
        EmailAddr : request.body.EmailAddr,
        Password : request.body.Password,
        RoleId : request.body.RoleId
    };

    userPermanentModel.create(users, function(err, res){
        if(err)
        {
            response.statusCode=500;
            response.send({statusCode: response.statusCode, message:err});
        }
        response.send({statusCode:200, message: res});
    });
});
  
  //The secret for the jwt
  var jwtSettings={
      jwtSecret: "jbscbihdfcifc"
  } 
  
  //The set with express
  instance.set("jwtSecret", jwtSettings.jwtSecret);
  var tokenStore=" ";
  
  //Authentication user
  instance.post("/api/users/auth", function(request,response){
      var user={
        Username : request.body.Username,
        Password : request.body.Password,
        EmailAddr : request.body.EmailAddr,
        RoleId : request.body.RoleId
      };
      
  
      console.log(request.body.Username);
  
      console.log("In auth user", JSON.stringify(user));
      userModel.findOne({Username:request.body.Username}, function(err, usr){
          console.log(usr);
          if(err)
          {
              console.log("Some Error has occured");
              throw err;
          }
          if(!usr){
              response.send({statusCode:404, message:"Sorry user is not available."});
          }
          else if(usr)
          { 
              if(usr.Password != user.Password )
              {
                  response.send({statusCode: 404, message:"Sorry! username and password not found"});
              }
             
              else{
                  console.log("In else if", JSON.stringify(usr));
                  // Sign in user and generate token
                  var token=jwt.sign({usr}, 
                      instance.get("jwtSecret"),{
                     // expiresIn:36000
                  });
                  //save token globally
                  
                  roleModel.findOne({RoleId: usr.RoleId}, (err, data) => {
                      console.log(data)
                    if(err){
                        console.log(err);
                    }else if(data){
                        
                        var rname=data.RoleName;
                        console.log(data.RoleName);//getting the role name for the logged-in user
        
                        response.send({
                            authenticated: true,
                            //role:'admin',
                            //userName:'xyz.abc',
                            message: "Login Success",
                            token: token,
                            role: rname
                        });
                    }
                    else{
                        response.send({
                            status:403,
                            statusCode:"unauthorized Access"
                        });
                    }
                        
                });
        
                //   console.log("In else if", JSON.stringify(usr));
                //   tokenStore=token;
                //   console.log(tokenStore);
                //   response.send({authenticated: true, message: "Login Successfull", token:token});
              }
          }
      });
  });

   // Authenticate permanent
   instance.post("/api/users/permanent/auth", function(request,response){
    var user={
      Username : request.body.Username,
      Password : request.body.Password,
      EmailAddr : request.body.EmailAddr,
      RoleId : request.body.RoleId
    };
    console.log(request.body.Username);
    console.log("In auth user", JSON.stringify(user));
    userPermanentModel.findOne({Username:request.body.Username}, function(err, usr){
        console.log(usr);
        if(err)
        {
            console.log("Some Error has occured");
            throw err;
        }
        if(!usr){
            response.send({statusCode:404, message:"Sorry user is not available."});
        }
        else if(usr)
        {
            
            if(usr.Password != user.Password )
            {
               
                response.send({statusCode: 404, message:"Sorry! username and password not found"});
            }
           
            else{
                console.log("In else if", JSON.stringify(usr));
                // Sign in user and generate token
                var token=jwt.sign({usr}, 
                    instance.get("jwtSecret"),{
                 //   expiresIn:36000
                });
                //save token globally
                
                roleModel.findOne({RoleId: usr.RoleId}, (err, data) => {
                    console.log(data)
                  if(err){
                      console.log(err);
                  }else if(data){
                      
                      var rname=data.RoleName;
                      console.log(data.RoleName);//getting the role name for the logged-in user
      
                      response.send({
                          authenticated: true,
                          //role:'admin',
                          //userName:'xyz.abc',
                          message: "Login Success",
                          token: token,
                          role: rname
                      });
                  }
                  else{
                      response.send({
                          status:403,
                          statusCode:"unauthorized Access"
                      });
                  }
                      
              });
      
              //   console.log("In else if", JSON.stringify(usr));
              //   tokenStore=token;
              //   console.log(tokenStore);
              //   response.send({authenticated: true, message: "Login Successfull", token:token});
            }
        }
    });
});

  //Display Users With role
  instance.get("/api/users",function(request, response){
      tok=request.headers.authorization;
      console.log (tok);
    var tokenRecieved=request.headers.authorization.split(" ")[1];
    // verify token
    jwt.verify(tokenRecieved,instance.get("jwtSecret"), function(err, decoded){
        console.log("In verify");
        if(err){
            console.log("In auth error");
            response.send({Success: false, message:"Token verification error"});
        }
        else{
            console.log("login successful");
            //decode the request
            request.decoded=decoded;
            userModel.find().exec(function(err, res){
                if(err)
                {
                    response.statusCode=500;
                    response.send({statusCode: response.statusCode, error:err });
                }
                response.send({statusCode: 200, data:res});
            });

            
        }
    });
});
   
     //Display Users With role permanent
  instance.get("/api/users/permanent",function(request, response){
    tok=request.headers.authorization;
    console.log (tok);
  var tokenRecieved=request.headers.authorization.split(" ")[1];
  // verify token
  jwt.verify(tokenRecieved,instance.get("jwtSecret"), function(err, decoded){
      console.log("In verify");
      if(err){
          console.log("In auth error");
          response.send({Success: false, message:"Token verification error"});
      }
      else{
          console.log("login successful");
          //decode the request
          request.decoded=decoded;
          userPermanentModel.find().exec(function(err, res){
              if(err)
              {
                  response.statusCode=500;
                  response.send({statusCode: response.statusCode, error:err });
              }
              response.send({statusCode: 200, data:res});
          });

          
      }
  });
});
   // Update User Profile
  instance.put("/api/users/:id", function(request, response) {
    // read the request id parameter
    // read the body
    // update matched record from array
    // respond array
    var tokenRecieved=request.headers.authorization.split(" ")[1];
    jwt.verify(tokenRecieved,instance.get("jwtSecret"), function(err, decoded){
        console.log("In verify..................................");
        if(err){
            console.log("In auth error");
            response.send({Success: false, message:"Token verification error"});
        }
        else{
            console.log("login successful");
            //decode the request
            request.decoded=decoded;
    
    // parsing posted data into JSON
    var id={ _id: request.params.id  }
    console.log(id);
    var newvalue={$set:{
        Username : request.body.Username,
        Password : request.body.Password,
        EmailAddr : request.body.EmailAddr,
        RoleId : request.body.RoleId
                        }};
                        console.log(newvalue);
        userModel.updateOne(id,newvalue,function(err,res){
        if(err){
          response.statusCode=500;
          response.send({status:response.statusCode,error:err});
        }
      response.send({status:200,data:res});
      });
    }
});
  });

  //Update in permanent user table
  instance.put("/api/users/permanent/:id", function(request, response) {
    // read the request id parameter
    // read the body
    // update matched record from array
    // respond array
    var tokenRecieved=request.headers.authorization.split(" ")[1];
    jwt.verify(tokenRecieved,instance.get("jwtSecret"), function(err, decoded){
        console.log("In verify..................................");
        if(err){
            console.log("In auth error");
            response.send({Success: false, message:"Token verification error"});
        }
        else{
            console.log("login successful");
            //decode the request
            request.decoded=decoded;
    
    // parsing posted data into JSON
    var id={ _id: request.params.id  }
    console.log(id);
    var newvalue={$set:{
        Username : request.body.Username,
        Password : request.body.Password,
        EmailAddr : request.body.EmailAddr,
        RoleId : request.body.RoleId
                        }};
                        console.log(newvalue);
        userPermanentModel.updateOne(id,newvalue,function(err,res){
        if(err){
          response.statusCode=500;
          response.send({status:response.statusCode,error:err});
        }
      response.send({status:200,data:res});
      });
    }
});
  });

  //Delete the user profile
  instance.delete("/api/users/:id",function(request,response){
    // read the request id parameter
    // delete matched record array
    // respond array
    var tokenRecieved=request.headers.authorization.split(" ")[1];
    jwt.verify(tokenRecieved,instance.get("jwtSecret"), function(err, decoded){
        console.log("In verify");
        if(err){
            console.log("In auth error");
            response.send({Success: false, message:"Token verification error"});
        }
        else{
            console.log("login successful");
            //decode the request
            request.decoded=decoded;
    
            var id={ _id: request.params.id  }
            console.log(id);
      userModel.deleteOne(id,function(err,res){
        if(err){
          response.statusCode=500;
          response.send({status:response.statusCode,error:err});
        }
      response.send({status:200,data:res});
      });
    }
    });
});


  //code for productAPI
  var infoScheme={
    PersonalUniqueId: String,
    FullName: Object,
    Gender: String,
    Dob: String,
    Age: String,
    Address: Object,
    City: String,
    State: String,
    Pincode: String,
    PhoneNo: String,
    Telephone: String,
    PhysicalDisability: String,
    MaritalStatus: String,
    EducationStatus: String,
    BirthSign: String
  }

  var infoPermanentScheme={
    PersonalUniqueId: String,
    FullName: Object,
    Gender: String,
    Dob: String,
    Age: String,
    Address: Object,
    City: String,
    State: String,
    Pincode: String,
    PhoneNo: String,
    Telephone: String,
    PhysicalDisability: String,
    MaritalStatus: String,
    EducationStatus: String,
    BirthSign: String
  }
  
  var InfoModel=mongoose.model("PersonalInfo",infoScheme,"PersonalInfo");
  var InfoPerModel=mongoose.model("PersonalInfoPermenant",infoPermanentScheme,"PersonalInfoPermenant");
  
  // verify token and provide access
  //  Retrive or display data on screen
  
  instance.get("/api/info",function(request, response){
      var tokenRecieved=request.headers.authorization.split(" ")[1];
      // verify token
      jwt.verify(tokenRecieved,instance.get("jwtSecret"), function(err, decoded){
          console.log("In verify");
          if(err){
              console.log("In auth error");
              response.send({Success: false, message:"Token verification error"});
          }
          else{
              console.log("login successful");
              //decode the request
              request.decoded=decoded;
              InfoModel.find().exec(function(err, res){
                  if(err)
                  {
                      response.statusCode=500;
                      response.send({statusCode: response.statusCode, error:err });
                  }
                  response.send({statusCode: 200, data:res});
              });
  
              
          }
      });
  });
  
  instance.get("/api/info/Permanent",function(request, response){
    var tokenRecieved=request.headers.authorization.split(" ")[1];
    // verify token
    jwt.verify(tokenRecieved,instance.get("jwtSecret"), function(err, decoded){
        console.log("In verify");
        if(err){
            console.log("In auth error");
            response.send({Success: false, message:"Token verification error"});
        }
        else{
            console.log("login successful");
            //decode the request
            request.decoded=decoded;
            InfoPerModel.find().exec(function(err, res){
                if(err)
                {
                    response.statusCode=500;
                    response.send({statusCode: response.statusCode, error:err });
                }
                response.send({statusCode: 200, data:res});
            });

            
        }
    });
});

  //Insert  Person info
  instance.post("/api/info", function(request, response) {
    var tokenRecieved=request.headers.authorization.split(" ")[1];
    jwt.verify(tokenRecieved,instance.get("jwtSecret"), function(err, decoded){
        console.log("In verify");
        if(err){
            console.log("In auth error");
            response.send({Success: false, message:"Token verification error"});
        }
        else{
            console.log("login successful");
            //decode the request
            request.decoded=decoded;
        
    // parsing posted data into JSON
  
    var prd = {
        PersonalUniqueId: request.body.PersonalUniqueId,
        FullName:{
            FirstName: request.body.FullName.FirstName,
            MiddleName: request.body.FullName.MiddleName,
            LastName: request.body.FullName.LastName
        },
        Gender: request.body.Gender,
        Dob: request.body.Dob,
        Age : request.body.Age,
        Address : {
            FlatNo: request.body.Address.FlatNo, 
            SocietyName: request.body.Address.SocietyName, 
            AreaName: request.body.Address.AreaName
        },
        City: request.body.City,
        State: request.body.State,
        Pincode: request.body.Pincode,
        PhoneNo : request.body.PhoneNo,
        Telephone : request.body.Telephone,
        PhysicalDisability: request.body.PhysicalDisability,
        MaritalStatus : request.body.MaritalStatus,
        EducationStatus: request.body.EducationStatus,
        BirthSign: request.body.BirthSign  
    };
    console.log(prd);
  
    // pass the parsed object to "create()" method
    InfoModel.create(prd, function(err, res) {
      if (err) {
        response.statusCode = 500;
        response.send(err);
      }
      response.send({ status: 200, data: res });
    });
  }
  });
});
 
    
  // Update PermanentPerson
  instance.put("/api/info/permanent/:id", function(request, response) {
    // read the request id parameter
    // read the body
    // update matched record from array
    // respond array
    var tokenRecieved=request.headers.authorization.split(" ")[1];
    jwt.verify(tokenRecieved,instance.get("jwtSecret"), function(err, decoded){
        console.log("In verify");
        if(err){
            console.log("In auth error");
            response.send({Success: false, message:"Token verification error"});
        }
        else{
            console.log("login successful");
            //decode the request
            request.decoded=decoded;
    
    // parsing posted data into JSON
    var id={ PersonalUniqueId: request.params.id }
    var newvalue={$set:{PersonalUniqueId: request.params.PersonalUniqueId,
        FullName:{
            FirstName: request.body.FullName.FirstName,
            MiddleName: request.body.FullName.MiddleName,
            LastName: request.body.FullName.LastName
        },
        Gender: request.body.Gender,
        Dob: request.body.Dob,
        Age : request.body.Age,
        Address : {
            FlatNo: request.body.Address.FlatNo, 
            SocietyName: request.body.Address.SocietyName, 
            AreaName: request.body.Address.AreaName
        },
        City: request.body.City,
        State: request.body.State,
        Pincode: request.body.Pincode,
        PhoneNo : request.body.PhoneNo,
        Telephone : request.body.Telephone,
        PhysicalDisability: request.body.PhysicalDisability,
        MaritalStatus : request.body.MaritalStatus,
        EducationStatus: request.body.EducationStatus,
        BirthSign: request.body.BirthSign  
                        }};
        InfoPerModel.updateOne(id,newvalue,function(err,res){
        if(err){
          response.statusCode=500;
          response.send({status:response.statusCode,error:err});
        }
      response.send({status:200,data:res});
      });
    }
    });
  });

  // Delete info
  instance.delete("/api/info/:id",function(request,response){
    // read the request id parameter
    // delete matched record array
    // respond array
    var tokenRecieved=request.headers.authorization.split(" ")[1];
    jwt.verify(tokenRecieved,instance.get("jwtSecret"), function(err, decoded){
        console.log("In verify");
        if(err){
            console.log("In auth error");
            response.send({Success: false, message:"Token verification error"});
        }
        else{
            console.log("login successful");
            //decode the request
            request.decoded=decoded;
    
            var id={ _id: request.params.id  }
            console.log(id);
      InfoModel.deleteOne(id,function(err,res){
        if(err){
          response.statusCode=500;
          response.send({status:response.statusCode,error:err});
        }
      response.send({status:200,data:res});
      });
    }
    });
});

//Get personal information with _id
instance.get("/api/info/:id",function(request, response){
    var tokenRecieved=request.headers.authorization.split(" ")[1];
    // verify token
    jwt.verify(tokenRecieved,instance.get("jwtSecret"), function(err, decoded){
        console.log("In verify");
        if(err){
            console.log("In auth error");
            response.send({Success: false, message:"Token verification error"});
        }
        else{
            console.log("login successful");
            //decode the request
            request.decoded=decoded;
            var _id={  _id:request.params.id   }
            InfoModel.findOne(_id,function(err, res){
                if(err)
                {
                    response.statusCode=500;
                    response.send({statusCode: response.statusCode, error:err });
                }
                response.send({statusCode: 200, data:res});
            });

            
        }
    });
});

// get permanent Personal info
instance.get("/api/info/permanent/:id",function(request, response){
    var tokenRecieved=request.headers.authorization.split(" ")[1];
    // verify token
    jwt.verify(tokenRecieved,instance.get("jwtSecret"), function(err, decoded){
        console.log("In verify");
        if(err){
            console.log("In auth error");
            response.send({Success: false, message:"Token verification error"});
        }
        else{
            console.log("login successful");
            //decode the request
            request.decoded=decoded;
            var id={  PersonalUniqueId :request.params.id  }
            console.log(request.params.id);
            InfoPerModel.findOne(id,function(err, res){
                if(err)
                {
                    response.statusCode=500;
                    response.send({statusCode: response.statusCode, error:err });
                }
                else{
                    response.send({statusCode: 200, data:res});
                }
                
            });

            
        }
    });
});

//Create Permanent Personal info
instance.post("/api/info/permanent", function(request, response) {
    var tokenRecieved=request.headers.authorization.split(" ")[1];
    jwt.verify(tokenRecieved,instance.get("jwtSecret"), function(err, decoded){
        console.log("In verify");
        if(err){
            console.log("In auth error");
            response.send({Success: false, message:"Token verification error"});
        }
        else{
            console.log("login successful");
            //decode the request
            request.decoded=decoded;
        
    // parsing posted data into JSON
  
    var prd = {
        PersonalUniqueId : request.body.PersonalUniqueId,
        FullName:{
            FirstName: request.body.FullName.FirstName,
            MiddleName: request.body.FullName.MiddleName,
            LastName: request.body.FullName.LastName
        },
        Gender: request.body.Gender,
        Dob: request.body.Dob,
        Age : request.body.Age,
        Address : {
            FlatNo: request.body.Address.FlatNo, 
            SocietyName: request.body.Address.SocietyName, 
            AreaName: request.body.Address.AreaName
        },
        City: request.body.City,
        State: request.body.State,
        Pincode: request.body.Pincode,
        PhoneNo : request.body.PhoneNo,
        Telephone : request.body.Telephone,
        PhysicalDisability: request.body.PhysicalDisability,
        MaritalStatus : request.body.MaritalStatus,
        EducationStatus: request.body.EducationStatus,
        BirthSign: request.body.BirthSign  
    };
  
    // pass the parsed object to "create()" method
    InfoPerModel.create(prd, function(err, res) {
      if (err) {
        response.statusCode = 500;
        response.send(err);
      }
      response.send({ status: 200, data: res });
    });
  }
  });
});

//Search
instance.post("/api/info/permanent/search", function(request, response) {
    var tokenRecieved=request.headers.authorization.split(" ")[1];
    jwt.verify(tokenRecieved,instance.get("jwtSecret"), function(err, decoded){
        console.log("In verify");
        if(err){
            console.log("In auth error");
            response.send({Success: false, message:"Token verification error"});
        }
        else{
            console.log("login successful");
            //decode the request
            request.decoded=decoded;
        
    
    InfoPerModel.find({$or:[{City : request.body.City},{State:request.body.State}]}, function(err, res) {
      if (err) {
        response.statusCode = 500;
        response.send(err);
      }
      response.send({ status: 200, data: res });
    });
  }
  });
});

  
   