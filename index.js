// 7/28/21

let tag = "%";

const Discord = require("discord.js");
const fetch = require("node-fetch");
const Database = require("@replit/database")

const db = new Database()
const client = new Discord.Client();
const discordToken = process.env['TOKEN'];

const sadWords = ["sad", "depressed", "unhappy", "angry"]
const starterEncouragements = [
  "Cheer up!",
  "Hang in there!",
  "You are a great person.",
  "Is that you, Tommy?"
];

db.get("encouragements").then(encouragements => {
  if (!encouragements || encouragements.length < 1){
    db.set("encouragements", starterEncouragements)
  }
})

function updateEncouragements(encouragingMessage){
  db.get("encouragements").then(encouragements => {
    encouragements.push([encouragingMessage])
    db.set("encouragements", encouragements)
  })
}

function deleteEncouragements(index){
  db.get("encouragements").then(encouragements => {
    if (encouragements.length > index) {
      encouragements.splice(index, 1)
      db.set("encouragements",encouragements)
    }
  })
}

client.on("ready", () => {
  console.log('Logged in as ' + client.user.tag +'!')
})

function getQuote() {
  return fetch("https://zenquotes.io/api/random")
    .then(res => {
      return res.json()
    })
    .then(data => {
      return data[0]["q"] + " -" + data[0]["a"]
    })
}



// VOICE COMMANDS

client.on("voiceStateUpdate", (oldState, newState) => {
   
     if(oldState.speaking !== newState.speaking) {
       if (newState.tag === '703dc#8690') {
         newState.user.setM
       }
       
     }
});

// MESSAGE COMMANDS

client.on("message", msg => {
if (msg.author.bot) return;

  //SHUT UP [SIMREN]
  if(msg.author.tag === 'n00dles321#8413') {
    msg.react('🤢')
  }

  // SUPPORT Tommy
  if(msg.author.tag === 'sirTommy#9322') {
    msg.react('👍🏼')
  }

  if (msg.content === "ping") {
    msg.reply("pong")
  }

  if(msg.content === tag + "inspire"){
    getQuote().then(quote => msg.channel.send(quote))
  }

  if(sadWords.some(word => msg.content.includes(word))){
    db.get("encouragements").then(encouragements => {
      const encouragement = encouragements[Math.floor(Math.random() * encouragements.length)];
      msg.reply(encouragement);
    })
    
  }

  if (msg.content.startsWith(tag + "se")) {
    for(int i = 0; i < encouragements.length; i++){
      
    }
  }

  if (msg.content.startsWith(tag + "new")) {
    encouragingMessage = msg.content.split(tag + "new ")[1];
    updateEncouragements(encouragingMessage)
    msg.channel.send("New Encouraging Message Added.")
  }

  if (msg.content.startsWith(tag + "del")) {
    encouragingMessage = parseInt(msg.content.split(tag + "del ")[1]);
    deleteEncouragement(index)
    msg.channel.send("New Encouraging Message Deleted.")
  }

})

//

console.log("debug1")
client.login(discordToken)
