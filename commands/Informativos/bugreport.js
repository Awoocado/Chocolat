const Eris = require("eris-additions")(require("eris"));
const config = require("../../config.json")

exports.run = async (client, message, args) => {
  let [comando, bug, proceso] = args.join(' ').split(";");
  if (!comando) return message.channel.createMessage('Uso del comando: `{prefix}bugreport <comando>;<bug>;<proceso>`. (Los ";" separan al tipo de texto). Ej: {prefix}bugreport angry;Error;Usé el comando y marca un error número 502.'.replace(/{prefix}/gi, config.prefix)).then(m => setTimeout(() => m.delete(), 6000));
  try {
  comando = client.commands.get(comando) || client.commands.get(client.aliases.get(comando));
  if(!comando) return message.channel.createMessage('Debe poner un comando existente para reportar.').then(m => setTimeout(() => m.delete(), 6000));
  } catch {
    return message.channel.createMessage('Debe poner un comando existente para reportar.').then(m => setTimeout(() => m.delete(), 6000));
  }
  if (!bug) return message.channel.createMessage('Uso del comando: `{prefix}bugreport <comando>;<bug>;<proceso>`. Redacte un bug que esté detectando. Ej: {prefix}bugreport angry/Error/Usé el comando y marca un error número 502.'.replace(/{prefix}/gi, config.prefix)).then(m => setTimeout(() => m.delete(), 6000));
  if (!proceso) return message.channel.createMessage('Uso del comando: `{prefix}bugreport <comando>;<bug>;<proceso>`. No olvide comentarnos cómo llegó a dicho problema para poder orientarnos en base a su experiencia.'.replace(/{prefix}/gi, config.prefix)).then(m => setTimeout(() => m.delete(), 6000));
  if (bug.length > 600) return message.channel.createMessage('Haga más breve la descripción del bug. Máximo 600 caracteres.').then(m => setTimeout(() => m.delete(), 6000));
  if (proceso.length > 600) return message.channel.createMessage('Haga más breve la descripción del proceso. Máximo 600 caracteres.').then(m => setTimeout(() => m.delete(), 6000));

  const embed = new Eris.Embed()
    .title(':x: Reporte de error.')
    .field('Comando', '`' + comando.config.command + '`')
    .field('Bug', bug)
    .field('Método', proceso)
    .field('Usuario', message.author.tag, true)
    .field('ID del Usuario', message.author.id, true)
    .field('Servidor', message.guild.name, true)
    .field('ID del Servidor', message.guild.id, true)
    .field('Shard', `${message.channel.guild.shard.id + 1}`)
    .thumbnail(message.author.avatarURL)
    .timestamp()
    .color(0xd80202)
  try {
    client.executeWebhook('', '', {embeds: [embed]});
    message.channel.createMessage(':white_check_mark: | Reporte de error enviado, gracias por su ayuda. :thumbsup:').then(m => setTimeout(() => m.delete(), 6000))
  } catch (e) {
    return message.channel.createMessage(':x: | Hubo un error al intentar enviar el reporte. Puedes ir al Servidor de Soporte personalmente y reportar el error en el canal correspondiente.')
  };
};

exports.config = {
  command: 'bugreport',
  category: 'Comandos Informativos',
  permissions: 'Ninguno',
  description: 'Envía un reporte de error a los desarolladores usando a {botname}. Al momento de enviar un reporte de error, procura detallar cómo se produjo el error para así mejorar la investigación y su posterior arreglo. El uso del separador ";" es obligatorio.\n**Nota importante:** El mal uso de este comando puede terminar en una penalización.',
  usage: '{prefix}bugreport <comando>;<bug>;<proceso>',
  example: '{prefix}bugreport gimages;Error: 403;Este error sale al usar el comando, no tengo idea del por qué.\n\nEsto enviará el reporte a los desarrolladores, los cuales tratarán de identificar el error y arreglarlo.',
  aliases: ['bug'],
  developerOnly: false,
  allowedToDisable: false,
  visible: true,
  cooldown: 10000
};
