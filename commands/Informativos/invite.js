const Eris = require("eris-additions")(require("eris"));

exports.run = async (client, message, args) => {
  let gifs = ['https://k31.kn3.net/taringa/2/1/6/1/9/8/41/lilacamry1995/4D2.gif?7622', 'http://cdn48.picsart.com/165006973001202.gif', 'https://k36.kn3.net/taringa/7/4/9/2/7/5/1/yitanhxx/3EB.gif', 'https://media.giphy.com/media/10kOG7Oy7CSMZG/giphy.gif', 'https://cdn.discordapp.com/attachments/492119037971791872/552513339243233280/1470509623_tumblr_o563l5E1Fz1sg1ksjo1_500.gif', 'https://66.media.tumblr.com/74ff16652048aed9a4b60b26c85304e6/tumblr_oh24a5VaKe1t3uwllo1_400.gif', 'https://pa1.narvii.com/6037/fb4614059b22cec55ad95cbb3eb540aded98c520_hq.gif', 'https://pa1.narvii.com/6075/a0694f5a0ab662590fdafd32a3d4dabf29890e6d_hq.gif'];
  try {
    const embed = new Eris.Embed()
      .author(`Invitación de ${client.user.username}`, client.user.avatarURL)
      .description('Aquí tienes el enlace de invitación :heart: Con esto harás que pueda unirme a cualquier servidor que administres uwu\n**> Invitación:** __https://discordapp.com/oauth2/authorize?client_id=379757424447455232&permissions=8&scope=bot__')
      .field('Notas', '1. Se recomienda dejar el permiso `Administrador` activado para no tener ningún conflicto a futuro con los permisos.\n2. Debes tener el permiso `Administrar Servidor` activado en el servidor donde quieres invitar a ' + client.user.username + '.')
      .color(Math.floor(Math.random() * 0xffffff))
      .image(gifs[Math.floor(Math.random() * gifs.length)])
      .footer('¿Problemas invitando al bot? | Visita: https://discord.gg/TKTGm69')
    message.author.createMessage({ embed });
    message.channel.createMessage(':white_check_mark: | Te he enviado la invitación a tus mensajes privados.').then(m => setTimeout(() => m.delete(), 6000))
  } catch (e) {
    return message.channel.createMessage(':x: | No pude enviarte el mensaje a tus Mensajes Privados. Es posible que tengas tus Mensajes Privados deshabilitados. Utiliza `{prefix}infonodm` para obtener toda la información necesaria sin recibir algún mensaje privado.'.replace(/{prefix}/gi, require('../../config.json').prefix)).then(m => setTimeout(() => m.delete(), 6000))
  };
};

exports.config = {
  command: 'invite',
  category: 'Comandos Informativos',
  permissions: 'Ninguno',
  description: '{botname} te enviará la invitación a tus mensajes privados. Con ese enlace podrás hacer que {botname} se una al servidor que selecciones.',
  usage: '{prefix}invite',
  example: '',
  developerOnly: false,
  allowedToDisable: false,
  visible: true,
  cooldown: 5000
};