const Eris = require("eris-additions")(require("eris"));
const math = require('math-expression-evaluator');
const config = require("../../config.json")
exports.run = async (client, message, args) => {
  if (!args.join(' ')) return message.channel.createMessage(':x: | Debes escribir una ecuación matemática para calcular.\n> Ejemplo: {prefix}calc 2 + 2 - 4'.replace(/{prefix}/gi, config.prefix)).then(m => setTimeout(() => m.delete(), 8000))

  const question = args.join(' ');
  let answer;
  try {
    answer = math.eval(question);
    const embed = new Eris.Embed()
      .title(":bar_chart: Calculadora")
      .field("Ecuación:", '```'+question+'```')
      .field("Respuesta:", '```'+answer+'```')
      .color(Math.floor(Math.random() * 0xffffff))
      .footer(`Solicitado por: ${message.author.username}`);
    message.channel.createMessage({ embed });
  } catch (err) {
    if (err) return message.channel.createMessage(`:x:| No se pudo calcular la ecuación.\nEs posible que haya introducido incorrectamente su ecuación en el formato que se maneja.`);
  };
};

exports.config = {
  command: 'calc',
  category: 'Comandos Útiles',
  permissions: 'Ninguno',
  description: 'Calcula una ecuación. Algunas expresiones básicas son:\n```+ = Suma. | - = Resta. | * = Multiplicación. | / = División. | ^ = Exponenciación\n```\nPodrás conseguir todas las expresiones soportadas [entrando a este enlace.](https://www.npmjs.com/package/math-expression-evaluator)',
  usage: '{prefix}calc <ecuación>',
  example: '{prefix}calc (8^2 * 9) + (7 - 18)/2\n\nEsto calculará la ecuación y te dará el resultado.',
  aliases: ['math'],
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 5000
};