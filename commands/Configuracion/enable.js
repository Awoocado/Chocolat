const Eris = require("eris-additions")(require("eris"));
const db = require('quick.db');

exports.run = async (client, message, args) => {
  if (!message.member.hasPermission('administrator')) return message.channel.createMessage(':x: | No tienes los permisos requeridos para usar este comando.\nNecesitas tener el permiso `Administrador` activado.').then(m => setTimeout(() => m.delete(), 6000));
  const argumento = args.join(' ');
  if (!argumento) return message.channel.createMessage(':x: | Escriba el comando o módulo que desee habilitar.').then(m => setTimeout(() => m.delete(), 6000));
  const modulos = ["Informativos", "Útiles", "Divertidos", "de Juegos", "de Interacción", "de Reacción", "de Búsqueda", "NSFW", "ADMIN/MOD", "de Configuración"];
  const modules = ["Informativos", "Útiles", "Divertidos", "Juegos", "Interacción", "Reacción", "Búsqueda", "NSFW", "ADMIN/MOD", "Configuración"];
  if (modules.includes(argumento)) {
    const modulo = "Comandos " + modulos[modules.findIndex(m => m == argumento)];
    const comandos = client.commands.filter(m => m.config.category == modulo).filter(m => m.config.allowedToDisable);
    comandos.forEach(c => db.set(`${c.config.command}comDis_${message.guild.id}`, ''));
    const embed = new Eris.Embed()
      .title(':white_check_mark: Módulo Activado.')
      .description('Se ha activado el módulo: `' + argumento + '`.')
      .color(Math.floor(Math.random() * 0xffffff));
    message.channel.createMessage({ embed });
  } else {
    let comando = client.commands.get(args[0]) || client.commands.get(client.aliases.get(args[0]));
    if (!comando) return message.channel.createMessage(':x: | El comando que has puesto no fue encontrado.').then(m => setTimeout(() => m.delete(), 6000));
    if (!comando.config.allowedToDisable) return message.channel.createMessage(':x: | El comando que has no se pudo habilitar.').then(m => setTimeout(() => m.delete(), 6000));
    db.set(`${comando.config.command}comDis_${message.guild.id}`, '');
    const embed = new Eris.Embed()
      .title(':white_check_mark: Comando activado.')
      .description('Se ha activado el comando: `' + argumento + '`.')
      .color(Math.floor(Math.random() * 0xffffff))
    message.channel.createMessage({ embed });
  };
};

exports.config = {
  command: 'enable',
  category: 'Comandos de Configuración',
  permissions: 'Administrador',
  description: 'Activa un comando que ha sido desactivado previamente, asegúrate de escribirlo en minúsculas.',
  usage: '{prefix}enable <comando/módulo>',
  example: '{prefix}enable say | {prefix}enable NSFW\n\n1. *{prefix}enable comando*: Este activará el comando especificado.\n2. *{prefix}enable módulo*: Este activará el módulo especificado, por el cual se activarán todos los comandos de dicho módulo.',
  aliases: ['en'],
  developerOnly: false,
  allowedToDisable: false,
  visible: true,
  cooldown: 2000
};