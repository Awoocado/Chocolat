const Eris = require("eris-additions")(require("eris"));
const db = require('quick.db');
exports.run = async (client, message, args) => {
  let channel;
  const u = db.fetch(`confChannel_${message.guild.id}`);
  let args2 = args.join(' ').split('--').slice(0);
  let texto = args2[0];
  if (!message.channel.memberHasPermission(client.user.id, 'manageMessages'));
else message.delete();

  if (!message.guild.channels.get(u)) return message.channel.createMessage(':x: | El canal de confesiones no está establecido.').then(m => setTimeout(() => m.delete(), 6000))
  else channel = message.guild.channels.get(u);
  if (!texto) return message.channel.createMessage(':x: | Debes escribir el contenido de la confesión. Si deseas que salga con tu nombre, escribe `--n` al final de ella.').then(m => setTimeout(() => m.delete(), 6000))
  if (texto.length > 900) return message.channel.createMessage(':x: | La confesión excedió el límite de caracteres permitidos (900)').then(m => setTimeout(() => m.delete(), 6000))

  const embed = new Eris.Embed().title('Nueva confesión:').description('\n_' + texto + '_').color(Math.floor(Math.random() * 0xffffff)).timestamp();

  if (args2.includes("n")) embed.footer('Por: ' + message.author.tag);
  else embed.footer('Por: Anónimo.');
  
  channel.createMessage({ embed });
};

exports.config = {
  command: 'confession',
  category: 'Comandos Divertidos',
  permissions: 'Ninguno',
  description: 'Confiesa algo de forma anónima por defecto o mostrando tu nombre con "--n" al final del comando. El mensaje de la confesión tiene un límite de 900 caracteres.\nAntes de confesar, el canal de confesiones debe estar establecido. Si eres el Administrador, ejecuta el comando `{prefix}setconfessions #canal` para establecer el canal.',
  usage: '{prefix}confession <texto> [--n]',
  example: '{prefix}confession Hice algo muy malo y mi vida está manchada. | {prefix}confession Hice algo muy malo y mi vida está manchada. --n\n\n1. *{prefix}confession texto*: Esto enviará tu confesión al canal establecido de forma anónima.\n2. *{prefix}confession texto --n*: Esto enviará tu confesión al canal establecido indicando que el autor eres tú.',
  aliases: ['confess', 'admit'],
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 2000
};