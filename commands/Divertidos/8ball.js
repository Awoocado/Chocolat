const Eris = require("eris-additions")(require("eris"))

exports.run = async (client, message, args) => {
  if (!args.join(' ')) return message.channel.createMessage(message.author.mention+`, ¿y la pregunta cuál es? o.O`).then(m => setTimeout(() => m.delete(), 6000));
  var rpts = [
    'Sí <3',
    'No ¬¬',
    'Puede ser e.e',
    'Tal vez o.o',
    'No lo sé :S',
    'Definitivamente.',
    '¡Claro! :D',
    '¡Por supuesto!',
    'Sí...',
    'No...',
    '¡Por supuesto que no! >.<',
    'Es probable uwu',
    'Probablemente no.',
    'Quizás...',
    'Pregunta en otro momento.',
    'Eso es imposible.',
    'Es posible o.o',
    'Quisiera saberlo...',
    'No entiendo o.O',
    '¡Sin lugar a dudas!',
    'Exactamente.',
    'Cierto',
    'Falso',
    'No hay duda acerca de ello.',
    'No creo',
    'Sí creo',
    'Eso es interesante o.o',
    'Pregúntame otra cosa, ¿sí?',
    'Teóricamente, sí.',
    'Teóricamente, no.',
    'No estés tan seguro de eso.',
    'Estoy teniendo un poco de lag, pregunta de nuevo.',
    '¿Tú qué crees?',
    'No digas eso...',
    '¿Por qué la pregunta?',
    'Tal vez en un año >.<',
    'La verdad es que no -_-',
    '¿Crees que sí? Yo creo que no ._.',
    'Estoy segura de que se hará realidad. ^.^/',
    'Yo digo que sí, pero tu destino dice que no >u<',
    'Se supone que sí.'
  ]
  const embed = new Eris.Embed()
    .title(':8ball: Pregunta 8ball.')
    .field(`${message.author.username} pregunta:`, `${args.join(' ')}`)
    .field('Respuesta:', `${rpts[Math.floor(Math.random() * rpts.length)]}`)
    .color(Math.floor(Math.random() * 0xffffff))
  message.channel.createMessage({ embed })
}

exports.config = {
  command: '8ball',
  category: 'Comandos Divertidos',
  permissions: 'Ninguno',
  description: 'Hazle preguntas de sí/no a {botname} y ella te responderá. Ten en cuenta que por cuestiones de coherencia entre la pregunta y respuesta, debes preguntar algo que se pueda contestar con "Sí" o "No".',
  usage: '{prefix}8ball <pregunta>',
  example: '{prefix}8ball ¿conseguiré el amor de ella?\n\nEsto responderá la pregunta con "Sí" o "No" en diferentes formas.\n~~Posiblemente me responda que no a la pregunta del ejemplo :c ... Att: Noname7612~~',
  aliases: ['8b'],
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 2000
}
