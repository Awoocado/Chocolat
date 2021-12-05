const Eris = require("eris-additions")(require("eris"));
const pack = require('../../package.json');

exports.run = async (client, message, args) => {
  const embed = new Eris.Embed()
    .author(`Acerca de ${client.user.username}`, client.user.avatarURL)
    .thumbnail(client.user.avatarURL)
    .color(Math.floor(Math.random() * 0xffffff))
    .description("" + client.user.username + " es una bot multipropósitos enfocada a la diversión y entretenimiento del servidor. La personaje como tal proviene del anime **Noucome**.")
    .field('Creador del bot', 'Noname7612#5043', true)
    .field("Desarrolladores", "Noname7612#5043, Arcus#3871 y Avocado#0741", true)
    .field("Versión", `${pack.version}`, true)
    .field("Upvote en DBL", "[Click acá](https://discordbots.org/bot/379757424447455232)", true)
    .field("Donar", "[Donar](https://www.patreon.com/ChocolatDiscordBot)", true)
    .field('Información del Personaje', "[Click aquí](https://aminoapps.com/c/anime-es/page/item/Chocolat/YjPc_XI1QDq8gqaZJap47wa822lNvDz)", true)
    .field('Ver anime de ' + client.user.username + '.', "[Click aquí](https://animeflv.net/anime/2941/noucome)", true)
    .field("Otros links", "[Invitar](https://discordapp.com/oauth2/authorize?client_id=379757424447455232&permissions=8&scope=bot) | [Servidor](https://discord.gg/CgSHkuK) | [Página web](https://chocolatbot.weebly.com/)", true)
  message.channel.createMessage({ embed });
};

exports.config = {
  command: 'about',
  category: 'Comandos Informativos',
  permissions: 'Ninguno',
  description: 'Obtén información no técnica acerca del bot.',
  usage: '{prefix}about',
  example: '',
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 5000
};
