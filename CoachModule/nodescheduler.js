const schedule = require('node-schedule');
var user = require('../userModule/userModel')
var rendezvous = require('./rendevousModel')
 const task = schedule.scheduleJob('* * * * *', async function() {
  const timeString = new Date(new Date().getTime() + 6*60*1000).toTimeString()
  const datesring = new Date().toDateString()
 // const accountSid = 'ACf094952a8038acf7840821ae918dd8e8';
 // const authToken = 'd62726e0bb387b34c79c73c74036a605';
  const client = require('twilio')('ACf094952a8038acf7840821ae918dd8e8', 'a47287ac5b3abbb18ac253ebca43e5f8');
  
  const twilioNumber = '+15856591913';

    const rdv = await rendezvous.find();
   // console.log(" vous avez un rendez vous")
   rdv.forEach(element => {
    if(element.date ){
    //console.log(element.date.toTimeString())
    //console.log(timeString)
      if(element.date.toTimeString() == timeString && element.date.toDateString()==datesring){
       const number= '+216' + element.tel;
       console.log(number)
        console.log(element.date)
        client.messages
        .create({
          body: `RAPPEL vous avez un rendez vous planifié le ${element.date}`,
          from: twilioNumber,
          to: '+21650538373'
        })
        .then(message => console.log(message.sid));
        console.log(" vous avez un rendez vous")
        
      }

      
   
    }
  
    
      
    });
    
    

});

task.cancel()
