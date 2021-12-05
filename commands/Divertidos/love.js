const Canvas = require('canvas');
const pixelUtil = require('pixel-util');

exports.run = async (client, message, args) => {
  var emoji;
  var mensagem;
  var porcentagem;
  let argsm = args.join(' ');
  let args2 = argsm.split('--').slice(0);

  if (!message.channel.memberHasPermission(client.user.id, 'attachFiles')) return message.channel.createMessage(':x: | No tengo los permisos necesarios para subir archivos.\nNecesito tener el permiso `Adjuntar Archivos` activado.').then(m => setTimeout(() => m.delete(), 6000));

  if (!message.mentions[0]) return message.channel.createMessage(':x: | Debes mencionar a 2 usuarios para calcular el porcentaje de amor entre ellos. También puedes mencionar a 1 usuario para calcular el porcentaje entre tú y el usuario mencionado.').then(m => setTimeout(() => m.delete(), 8000));
  if (message.mentions[0] && !message.mentions[1]) {
    var user1 = message.author,
      user2 = message.mentions[0];
  } else {
    var user1 = message.mentions[1],
      user2 = message.mentions[0];
  };
  var prc = Math.round(Math.random() * 100);

  if (args2.includes("real")) {
    let x = user1.discriminator;
    let y = user2.discriminator;
    const result = Math.round(((x * 0.01) + (y * 0.01)));
    var prc = result;

    if (result > 100) prc = (result - 100);
  } else {
    if (args2.includes("today")) {
      let x = user1.discriminator;
      let y = user2.discriminator;
      var d = new Date();
      var n = (d.getDate() * 100) / 31;
      var xy = Math.round(((x * 0.01) + (y * 0.01)));
      if (xy > 100) xy = (xy - 100);
      var result = Math.floor(xy + n);
      var prc = Math.round((result * 100) / 200);
    };
  };

  if (user1.id == user2.id) prc = "∞"

  if (user1.id == user2.id) {
    emoji = 'https://cdn.discordapp.com/attachments/583039290364264464/632800812216877066/a42df564f00ed8bbca652dc9345d3834.png'
    porcentagem = "[██████████]"
    mensagem = `**Tú eres el dueño de tu vida, no importa si te amas o te odias, tu valor personal ante ti debe ser infinito.**`
  } else if (prc == 0) {
    emoji = 'https://i.imgur.com/t9Jd3K9.png';
    porcentagem = "[. . . . . . . . . .]";
    mensagem = "**Ni siquiera debieron haberse conocido, no querrán saber del uno al otro y es seguro que se detestarán por siempre.**";
  } else if (prc <= 10) {
    emoji = 'https://i.imgur.com/t9Jd3K9.png';
    porcentagem = "[█ . . . . . . . . .]";
    mensagem = `**No son nada compatibles. Ni siendo amigos o conocidos funcionará... Lo mejor es que cada uno agarre caminos diferentes y conozcan otras personas.**`;
  } else if (prc <= 20) {
    emoji = 'https://i.imgur.com/t9Jd3K9.png';
    porcentagem = "[██ . . . . . . . .]";
    mensagem = `**No parecen ser compatibles. Quedarse como conocidos es la mejor opción.**`;
  } else if (prc <= 40) {
    emoji = 'https://i.imgur.com/Y7GwywE.png';
    porcentagem = "[████ . . . . . .]";
    mensagem = `**Normal. Es más probable que se queden como amigos y nada más.**`;
  } else if (prc <= 60) {
    emoji = 'https://i.imgur.com/Y7GwywE.png';
    porcentagem = "[██████ . . . .]";
    mensagem = `**Parecen ser compatibles. Pero creo que es posible que queden como amigos cercanos, y quizá mejores amigos.**`;
  } else if (prc <= 80) {
    emoji = 'https://i.imgur.com/ycSpTIh.png';
    porcentagem = "[████████ . .]";
    mensagem = `**Son compatibles, perfectamente pueden ser mejores amigos con posibilidades que se dé algo en un futuro.**`;
  } else if (prc <= 99) {
    emoji = 'https://i.imgur.com/Y7GwywE.png';
    porcentagem = "[█████████ .]";
    mensagem = `**Son muy compatibles. Perfectamente ustedes pueden ser pareja, y una pareja duradera.**`;
  } else {
    emoji = 'https://i.imgur.com/Fv8Irk0.png';
    porcentagem = "[██████████]";
    mensagem = `**¡Relación perfecta! Son altamente compatibles, nada del mundo podrá separarlos y es seguro que terminarán casados en un futuro.**`;
  }

  if (user1.avatar === null || user2.avatar === null) return message.channel.createMessage(':x: | Un usuario no tiene avatar, por lo cual no es posible calcular el porcentaje de amor entre ellos.').then(m => setTimeout(() => m.delete(), 6000))

  var Image = Canvas.Image,
    canvas = Canvas.createCanvas(660, 220),
    ctx = canvas.getContext('2d');

  let img = new Image;
  img.src = await pixelUtil.createBuffer(`https://cdn.discordapp.com/avatars/${user1.id}/${user1.avatar}.png?size=512`)
  ctx.drawImage(img, 0, 0, 220, 220);
  
  img.src = await pixelUtil.createBuffer(emoji)
  ctx.drawImage(img, 240, 20, 180, 180)

  img.src = await pixelUtil.createBuffer(`https://cdn.discordapp.com/avatars/${user2.id}/${user2.avatar}.png?size=512`)
  ctx.drawImage(img, 440, 0, 220, 220);

  let shipcalc = Math.floor(Math.random() * 3) + 2;
  let ship1 = user1.username;
  let ship2 = user2.username;
  let slice1 = ship1.slice(0, shipcalc);
  let slice2 = ship2.slice(3);
  let shipname = slice1 + slice2;

  if (user1.id == user2.id) {
    shipname = user1.username;
  };
  let shipmess;
  if (args2.includes("real")) {
    shipmess = `${message.author.mention} \nㅤ\n**${prc}** % ${porcentagem} ||Porcentaje real||\n${mensagem}\nNombre del Ship: **${shipname}**`;
  } else {
    if (args2.includes("today")) {
      shipmess = `${message.author.mention} \nㅤ\n**${prc}** % ${porcentagem} ||Porcentaje de hoy||\n${mensagem}\nNombre del Ship: **${shipname}**`;
    } else {
      shipmess = `${message.author.mention} \nㅤ\n**${prc}** % ${porcentagem} \n${mensagem}\nNombre del Ship: **${shipname}**`;
    };
  };
  message.channel.createMessage(shipmess, { file: canvas.toBuffer(), name: 'ship.png' });
};

//+'\n\nPsst... Use `{prefix}love <usuario1> [usuario2] --real` para calcular su porcentaje real';

exports.config = {
  command: "love",
  category: 'Comandos Divertidos',
  permissions: 'Ninguno.',
  description: 'Calcula el porcentaje de amor entre 2 personas. Puedes mencionar a 1 sola persona para calcular el amor entre tú y la persona mencionada. ¡También puedes sacar un porcentaje de amor verdadero y otro que varía según el día, pruébalos con `--real` y `--today`!\n**Nota:** Para que el comando funcione, los usuarios que se mencionen para este comando **deben tener avatar (imagen de perfil).** De lo contrario no funcionará.',
  usage: '{prefix}love <@usuario1> [@usuario2] [--today/--real]',
  example: '{prefix}love @MathError#6880 | {prefix}love @MathError#6880 @{botname}#2316 | '+ '{prefix}love @MathError#6880 @{botname}#2316 --real\n\n1. *{prefix}love @usuario1:* Calcula el porcentaje de amor entre tú y el usuario mencionado.\n2. *{prefix}love @usuario1 @usuario2*: Calcula el porcentaje de amor entre los usuarios mencionados. (El valor del porcentaje cambia cada vez que se ejecute el comando)\n3. *{prefix}love @usuario1 @usuario2 --opción*: Calcula el porcentaje de amor entre los usuarios, especificando una opción. (`--real`: Este valor no cambia independientemente de las veces que el comando se ejecute. | `--today`: Este valor cambia cada día.)',
  aliases: ['ship'],
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 15000
}