//lecture 244-250 Angela's course

const express = require ("express");
const request = require ("request");
const bodyParser = require("body-parser");
const https = require("https");
const { response } = require("express");

const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));

app.get("/", (req, res)=>{
    res.sendFile(__dirname + "/signup.html")
});

app.post("/", (req, res)=>{
    const fName = req.body.firstName;
    const sName = req.body.secondName;
    const formEmail = req.body.email;
    const data = {
        members: [
            {
                email_address: formEmail,
                status: "subscribed",
                merge_fields: {
                    FNAME: fName,
                    LNAME: sName
                }

            }
        ]
    };

    const jsonData = JSON.stringify(data);
    const url = "https://us5.api.mailchimp.com/3.0/lists/fc0d82012";
    const options = {
        method: "POST",
        auth: "natasha:1cd2008c72cef87c56de5226b37cf336-us5"

    }
    const request = https.request(url, options, (response)=>{
        console.log(response.statusCode)
       if (response.statusCode === 200) {
           res.sendFile(__dirname + "/success.html")

       } else {res.sendFile(__dirname + "/failure.html")}
        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    })
    request.write(jsonData);
    request.end();
   // console.log(fName, sName, formEmail)
});

app.post ("/failure.html", (req, res)=>{
    res.sendFile(__dirname + "/signup.html")
});

app.listen(process.env.PORT || 3000, ()=>{
    console.log("i'm running on port 3000")
});

// 1cd2008c72cef87c56de5226b37cf336-us5
// fc0d82012e
