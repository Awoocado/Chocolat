const Eris = require("eris-additions")(require("eris"));
const config = require('../../config.json');

exports.run = async (client, message, args) => {
  let command = client.commands.get(args[0]) || client.commands.get(client.aliases.get(args[0]));
  if (!args[0]) {
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
    try {
      await message.author.createMessage({ embed });
      await message.channel.createMessage(message.author.mention+', revisa tus mensajes privados n.n/').then(m => setTimeout(() => m.delete(), 6000))
    } catch (e) {
      return await message.channel.createMessage(':x: | No pude enviarte el mensaje a tus mensajes privados. Es posible que tengas tus Mensajes Privados deshabilitados. Puedes usar `{prefix}nodmhelp` para recibir la lista de comandos sin recibir algún mensaje privado.'.replace(/{prefix}/gi, require('../../config.json').prefix)).then(m => setTimeout(() => m.delete(), 8000))
    };
  } else {
    try {
      /*var author = `Ayuda detallada de "${command.config.command}"`;
      if (command.config.aliases) author += " / " + command.config.aliases.join(" / ");*/
      if(command.config.category =="Comandos NSFW") if(!message.channel.nsfw) return message.channel.createMessage("Para ver la ayuda de los comandos de este módulo necesitas usar el comando en un canal NSFW.")
      const embed = new Eris.Embed()
        .author(`Ayuda detallada de "${command.config.command}"`, client.user.avatarURL)
        .field('Categoría', command.config.category)
        .field('Permisos de usuario', command.config.permissions)
        .field('Descripción', command.config.description.replace(/{prefix}/gi, config.prefix).replace(/{botname}/gi,client.user.username))
        .field('Uso', command.config.usage.replace(/{prefix}/gi, config.prefix).replace(/{botname}/gi,client.user.username))
        .field('Ejemplo', command.config.example.replace(/{prefix}/gi, config.prefix).replace(/{botname}/gi,client.user.username) || 'Ninguno')
        .field('Cooldown', Math.floor(command.config.cooldown/1000) + ' segundos.', true)
        .field('Se puede desactivar', command.config.allowedToDisable ? 'Sí.' : 'No.', true)
        .field('Visible', command.config.visible ? 'Sí.' : 'No.', true)
        .footer('<> = obligatorio | [] = opcional. | No incluyas estos símbolos al momento de ejecutar el comando.')
        .color(Math.floor(Math.random() * 0xffffff))
      if(command.config.aliases) if(command.config.aliases[0]) embed.field('Aliases', command.config.aliases.join(", "))
      await message.channel.createMessage({ embed });
    } catch (e) {
      return await message.channel.createMessage(':x: | El comando que has puesto no existe.').then(m => setTimeout(() => m.delete(), 6000))
    };
  };
};

exports.config = {
  command: 'help',
  category: 'Comandos Informativos',
  permissions: 'Ninguno',
  description: 'Envía a tus mensajes privados la lista de comandos. O recibe la ayuda detallada de algún comando (Este último no va a tus mensajes privados).',
  usage: '{prefix}help [comando]',
  example: '{prefix}help | {prefix}help setwelcome\n\n1. *{prefix}help*: Envía la lista de comandos a tus mensajes privados.\n2. *{prefix}help comando*: Envía la ayuda detallada del comando especificado.',
  developerOnly: false,
  allowedToDisable: false,
  visible: true,
  cooldown: 5000
};
