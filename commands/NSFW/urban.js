const Eris = require("eris-additions")(require("eris"));
const urban = require('urban')
const translate = require('@vitalets/google-translate-api')
exports.run = async (client, message, args) => {
  if (!message.channel.nsfw) return message.channel.createMessage(":x: | No puedo mostrar contenido NSFW fuera de los canales NSFW.").then(m => setTimeout(() => m.delete(), 6000));
  if (!args.join(' ')) return message.channel.createMessage(':x: | Debes escribir términos para buscar en el Diccionario Urbano.').then(m => setTimeout(() => m.delete(), 6000));
  
  var targetWord = args.join(' ') == "" ? urban.random() : urban(args.join(' '));
  targetWord.first(async function (json) {
    if (json) {
      translate(json.definition, {
        to: 'es'
      }).then(res => {
        var result = "Diccionario Urbano: **" + json.word + "**\n\n" + res.text;
        if (json.example) {
          translate(json.example, {
            to: 'es'
          }).then(res2 => {
            result = result + "\n\n__Ejemplo__:\n" + res2.text
          }).catch(error2 => {
            return message.channel.createMessage(':x: | Ocurrió un error al traducir el ejemplo del diccionario urbano.');
          });
        }
        const embed = new Eris.Embed()
          .description(result)
          .color(Math.floor(Math.random() * 0xffffff));
        message.channel.createMessage({ embed });
      }).catch(error => {
        return message.channel.createMessage(':x: | Ocurrió un error al traducir la definición del diccionario urbano.');
      });
    } else {
      message.channel.createMessage(':x: | No hay resultados.').then(m => setTimeout(() => m.delete(), 6000));
    };
  });
};

exports.config = {
  command: "urban",
  category: 'Comandos NSFW',
  permissions: 'Canal NSFW',
  description: 'Busca términos en el Diccionario Urbano. Ten en cuenta que el Diccionario Urbano no es igual al Diccionado de la Real Academia Española o semejantes, este es un diccionario de Internet.',
  usage: '{prefix}urban <términos>',
  example: '{prefix}urban Hola\n\nEsto buscará el término "hola" en el Diccionario Urbano.',
  aliases: ['urb'],
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 10000
};