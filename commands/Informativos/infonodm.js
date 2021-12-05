const config = require("../../config.json")

exports.run = async (client, message, args) => {
  message.channel.createMessage('__**Información de ' + client.user.username + '**__\n\n**1.-** Si tienes alguna duda y/o problema con el uso del bot, puedes acceder al Servidor de Soporte.\n> https://discord.gg/CgSHkuK\n\n**2.-** ¡Accede a nuestro sitio web, donde encontrarás todos los comandos detallados y más información!\n> https://Chocolatbot.weebly.com/\n\n**3.-** Puedes aportar algo de dinero para mantener activo el desarrollo del bot, haciendo click en el enlace de abajo.\n> https://www.patreon.com/ChocolatDiscordBot\n\n**4.-** Puedes invitar a ' + client.user.username + ' haciendo click en el enlace de abajo. Debes tener el permiso de `Administrar Servidor` para poder invitarla.\n> https://discordapp.com/oauth2/authorize?client_id=379757424447455232&permissions=8&scope=bot\n\n**5.-** Puedes ver los comandos de Chocolat escribiendo `{prefix}help` o `{prefix}nodmhelp`. Este último es para recibir la lista de comandos sin que recibas un mensaje privado.\n\n**6.-** ¡Vota por nosotros en Discord Bot List (o Top.gg)!.\n> https://discordbots.org/bot/379757424447455232'.replace(/{prefix}/gi,config.prefix));
};

exports.config = {
  command: 'infonodm',
  category: 'Comandos Informativos',
  permissions: 'Ninguno',
  description: 'Envía información acerca del bot sin que {botname} te envíe un mensaje privado. **Aviso importante:** Este comando envía al canal publicidad referente a {botname}. Esta publicidad incluye: Enlaces de un Servidor de Discord, una invitación de un bot y otras páginas externas. Todo esto puede ser considerado **Spam publicitario** para algunos, por lo que se recomienda tener cuidado al momento de ejecutar este comando.',
  usage: '{prefix}infonodm',
  aliases: ['info'],
  example: '',
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 5000
};