const Eris = require("eris-additions")(require("eris"));
const config = require('../../config.json')

exports.run = async (client, message, args) => {
  let args2 = args.join(' ');
  let elementos = args2.split(';').slice(0);
  
  if (elementos.length <2) return message.channel.createMessage(':x: | Debes poner 2 o más opciones, separadas por ;\nEjemplo: {prefix}choose Anime ; Videojuegos'.replace(/{prefix}/gi, config.prefix)).then(m => setTimeout(() => m.delete(), 6000))
  if (!args2) return message.channel.createMessage(':x: | Debes poner 2 o más opciones, separadas por ;\nEjemplo: {prefix}choose Anime ; Videojuegos'.replace(/{prefix}/gi, config.prefix)).then(m => setTimeout(() => m.delete(), 6000))

  const embed = new Eris.Embed()
    .title(':question: Elección')
    .description(`<@${message.author.id}>, yo elijo: **${elementos[Math.floor(elementos.length * Math.random())]}**`)
    .color(Math.floor(Math.random() * 0xffffff));
  message.channel.createMessage({ embed });
};

exports.config = {
  command: 'choose',
  category: 'Comandos Divertidos',
  permissions: 'Ninguno',
  description: '{botname} elegirá una opción aleatoriamente de los argumentos previamente dados. Los argumentos se separan usando el ; . Mínimo deben haber 2 items para elegir. La cantidad de items que puedes poner para que {botname} eliga es ilimitada.',
  usage: '{prefix}choose <ítem1> ; <ítem2> ; [item3]...',
  example: '{prefix}choose Videojuegos ; Anime ; Vida social\n\nEsto hará que {botname} escoga 1 item de los 3 puestos en el ejemplo. A partir del item 3 en adelante puedes poner cuantos items quieras.',
  aliases: ['select'],
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 2000
};