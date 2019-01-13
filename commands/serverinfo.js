const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  
  let serverembed = new Discord.RichEmbed()
  .setDescription("Server information")
  .setColor("#1ced09")
  .addField("Server Name", message.guild.name)
  .addField("Created On", message.guild.createdAt)
  .addField("Total Members", message.guild.memberCount)
  
  message.channel.send(serverembed);
  
}

module.exports.help = {
    name: "serverinfo"
}