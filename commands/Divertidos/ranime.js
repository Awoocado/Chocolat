
const Eris = require("eris-additions")(require("eris"));
exports.run = async (client, message, args) => {
  let animes = [
    "[Accel World](https://animeflv.net/anime/747/accel-world)",
  ];

  const embed = new Eris.Embed()
    .title(":desktop: Recomendación de anime aleatoria")
    .description(
      `**${message.author.username}**, te recomiendo el anime: ${
        animes[Math.floor(animes.length * Math.random())]
      }`
    )
    .color(Math.floor(Math.random() * 0xffffff))
    .footer("Por AnimeFLV: https://animeflv.net");
  message.channel.createMessage({ embed });
};

exports.config = {
  command: "ranime",
  category: "Comandos Divertidos",
  permissions: "Ninguno",
  description: "Obtén un anime aleatoriamente.",
  usage: "{prefix}ranime",
  aliases: ["ran", "randomanime"],
  example: '',
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 2000
};
