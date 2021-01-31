const Discord = require("discord.js");
const config = require("./config.json");
const fs = require("fs");

const client = new Discord.Client();

client
  .login(config.BOT_TOKEN)
  .then((result) => {
    console.log("RESULT =>", result);
  })
  .catch((error) => {
    console.log("ERRO =>", error);
  });

client.on("message", (message) => {
  const registerString = fs.readFileSync('register.json');
  const register = JSON.parse(registerString);
  const data = {
    id: message.author.id,
    name: message.author.username,
    message: message.content,
  };
  register.push(data);
  const isArnau = message.content.toLowerCase().includes("arnau");
  const isArnabo = message.content.toLowerCase().includes("arnabo");
  fs.writeFileSync("register.json", JSON.stringify(register));
  if (!message.author.bot && (isArnabo || isArnau)) {
    message.channel.send("El arnau es maricooooooon");
  }
});
