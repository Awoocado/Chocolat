const Eris = require("eris-additions")(require("eris"));
const config = require('../../config.json');
exports.run = async (client, message, args) => {
  const field = (owo) => {
    embed.field(owo, "`" + client.commands.filter(w => w.config.visible == true).filter(q => q.config.category == owo).map(q => q.config.command).join("\` \`") + "`");
  };

  const embed = new Eris.Embed()
    .author('Comandos de ' + client.user.username + '', client.user.avatarURL)
    .description('Holii~, me llamo ' + client.user.username + ' n.n, y esta es mi lista de comandos~. Si necesitas ayuda detallada con algún comando, [visita este enlace](https://Chocolatbot.weebly.com/) para ver todos los comandos detalladamente. ¡También únete a nuestro servidor de discord! (https://discord.gg/TKTGm69)')
    .color(Math.floor(Math.random() * 0xffffff))
    .footer("Escribe {prefix}help [comando] para ayuda detallada. | Desarrollado por Noname7612#5043, Arcus#3871 y Avocado#0741".replace(/{prefix}/gi, config.prefix))
  field("Comandos ADMIN/MOD")
  field("Comandos de Búsqueda")
  field("Comandos de Configuración")
  field("Comandos Divertidos")
  field("Comandos Informativos")
  field("Comandos de Interacción")
  field("Comandos de Juegos")
  if (!message.channel.nsfw) embed.field("Comandos NSFW", "**Para ver los comandos de este módulo necesitas usar el comando en un canal NSFW.**")
  else field("Comandos NSFW")
  field("Comandos de Reacción")
  field("Comandos Útiles")
  message.channel.createMessage({ embed });
};

exports.config = {
  command: 'nodmhelp',
  category: 'Comandos Informativos',
  permissions: 'Ninguno',
  description: 'Obtén la lista de comandos sin que {botname} te envíe un Mensaje Directo.\n**Aviso:** En el mensaje Embed que envía hay enlaces de invitación a un Servidor de Discord y una página externa. Para algunos eso puede ser considerado **Spam Publicitario**, por lo que se recomienda tener cuidado al momento de ejecutar el comando.',
  usage: '{prefix}nodmhelp',
  example: '',
  aliases: ['ndh'],
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 5000
};
