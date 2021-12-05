const config = require('../../config.json')

exports.run = async (client, message, args) => {
  if (!args.join(" ")) return message.channel.createMessage(":x: | Debes seleccionar entre `piedra`, `papel` o `tijera`.\nEjemplo: {prefix}rps papel".replace(/{prefix}/gi,config.prefix)).then(m => setTimeout(() => m.delete(), 6000))

  let drawCommentary = [
    "Aw, ¿un empate? ¿es en serio?",
    "Elegiste lo mismo que yo, vaya coincidencia o.o",
    "Y yo que pensaba que con esta elección ganaba...",
    "Empatar no me causa ninguna gracia -.-'",
    "Oh, empatamos esta vez, no pasa nada :3 Vuelve a jugar conmigo, ¿sí?",
    "Tengo un mal presentimiento...",
    "Eso... estuvo cerca."
  ];
  let loseCommentary = [
    "He perdido :c ...",
    "Y yo que pensaba que iba a ganar seguro...",
    'Y decían que las IAs eran invencibles... vaya reprentación de "IA" acabo de hacer.',
    "¡Me has ganado, no puede ser! >.<",
    "¡Me ganaste! :heart: Felicidades por tu logro. ~~A la próxima no me dejaré vencer tan fácil~~",
    "¡Otra vez! ¡Esta ronda no vale! >-<",
    "¡Uy, he perdido! D:",
    `Maravillosa jugada, **${message.author.username}**`,
    "Solo fue suerte de principiante. Esa suerte no durará mucho.",
    "No creas que esto es todo, apenas calentaba. ¡Volvamos a jugar!"
  ];
  let winCommentary = [
    "¡Ajá, he ganado :D!",
    "¿Ves? Nadie puede vencerme o7",
    "Lamento informarte que has perdido en mi juego favorito :3",
    "Muy pocos me han derrotado aquí.",
    "¿Y eso es todo lo que tienes? Me resultó bastante fácil.",
    "Siendo sincera, pensé que la iba a perder xD Pero la suerte ha estado de mi lado.",
    "Me temo que tu elección no fue la correcta.",
    "¡Sí, te he ganado! >:D",
    "¡Me siento inspirada, volvamos a jugar!",
    "Te digo, las IAs como yo somos invencibles, jajaja.",
    "Jajaja, te gané, ¿viste?",
    "-bosteza- Fue tan fácil vencerte..."
  ];

  let usermChoice = args.join(" ");
  let botmChoice = Math.random();
  
  if (botmChoice < 0.34) botmChoice = "piedra"
  else if (botmChoice <= 0.67) botmChoice = "papel";
  else botmChoice = "tijera"

  if (usermChoice === botmChoice) return message.channel.createMessage(message.author.username +": **" +usermChoice +"**\n" +client.user.username +": **" +botmChoice +"**\nResultado: **Empate.**\nComentario de " +client.user.username +": " +drawCommentary[Math.floor(Math.random() * drawCommentary.length)]); //Draw
  if (usermChoice === "piedra") {
    if (botmChoice === "tijera") return message.channel.createMessage(message.author.username +": **" +usermChoice +"**\n" +client.user.username +": **" +botmChoice +"**\nResultado: **¡Has ganado!** Las tijeras no pueden cortar piedras.\nComentario de " +client.user.username +": " +loseCommentary[Math.floor(Math.random() * loseCommentary.length)]); //User Win
    else if (botmChoice === "papel") return message.channel.createMessage(message.author.username +": **" +usermChoice +"**\n" +client.user.username +": **" +botmChoice +"**\nResultado: **¡Has perdido!** El papel cubre a la piedra.\nComentario de " +client.user.username +": " +winCommentary[Math.floor(Math.random() * winCommentary.length)]); //User Defeat
  }
  if (usermChoice === "papel") {
    if (botmChoice === "piedra") return message.channel.createMessage(message.author.username +": **" +usermChoice +"**\n" +client.user.username +": **" +botmChoice +"**\nResultado: **¡Has ganado!** El papel cubre a la piedra.\nComentario de " +client.user.username +": " +loseCommentary[Math.floor(Math.random() * loseCommentary.length)]); //User Win
    else if (botmChoice === "tijera") return message.channel.createMessage(message.author.username +": **" +usermChoice +"**\n" +client.user.username +": **" +botmChoice +"**\nResultado: **¡Has perdido!** Las tijeras cortan el papel.\nComentario de " +client.user.username +": " +winCommentary[Math.floor(Math.random() * winCommentary.length)]); //User Defeat
  }
  if (usermChoice === "tijera") {
    if (botmChoice === "piedra") return message.channel.createMessage(message.author.username +": **" +usermChoice +"**\n" +client.user.username +": **" +botmChoice +"**\nResultado: **¡Has perdido!** Las tijeras no pueden cortar piedras.\nComentario de " +client.user.username +": " +winCommentary[Math.floor(Math.random() * winCommentary.length)]); //User Defeat
    else if (botmChoice === "papel") return message.channel.createMessage(message.author.username +": **" +usermChoice +"**\n" +client.user.username +": **" +botmChoice +"**\nResultado: **¡Has ganado!** Las tijeras cortan el papel.\nComentario de " +client.user.username +": " +loseCommentary[Math.floor(Math.random() * loseCommentary.length)]); // User Win
  }
  else message.channel.createMessage(":x: | Debes seleccionar entre `piedra`, `papel` o `tijera`.\nEjemplo: {prefix}rps papel".replace(/{prefix}/gi,config.prefix)).then(m => setTimeout(() => m.delete(), 6000));
};

exports.config = {
  command: "rps",
  category: "Comandos Divertidos",
  permissions: "Ninguno",
  description:
    "Juega Piedra, papel o tijeras con {botname}. Debes escribir una de las 3 opciones posibles en este juego.",
  usage: "{prefix}rps <piedra/papel/tijeras>",
  example:
    "{prefix}rps papel\n\nEsto iniciará el juego contra {botname} con la opción especificada.",
  aliases: ["rockpaperorscissors"],
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 2000
};
