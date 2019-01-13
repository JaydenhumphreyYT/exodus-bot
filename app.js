const botconfig = require("./botconfig.json");
const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require("fs");
bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {

    if(err) console.log(err)

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0){
        console.log("culdent find commands.");
        return;
    }

    jsfile.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        console.log(`${f} loades`);
        bot.commands.set(props.help.name, props);
    });

});


bot.on('ready', () => {
    console.log(`${bot.user.username} is online on ${bot.guilds.size} servers!`);
});

// commands after this
bot.on("message", async message => {
    if(message.author.Client) return;
    if(message.channel.type === "dm") return;

    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    if(commandfile) commandfile.run(bot, message, args);

})

// Create an event listener for new guild members
bot.on('guildMemberAdd', member => {
    // Send the message to a designated channel on a server:
    const channel = member.guild.channels.find(ch => ch.name === 'member-log');
    // Do nothing if the channel wasn't found on this server
    if (!channel) return;
    // Send the message, mentioning the member
    channel.send(`Welcome to the server, ${member}`);
  });

bot.login("NTMyNzU3MjU3MDgwMDEyODAy.DxhIiQ.7454ULP-Zr-swIY37hSTLYE1F2E");

