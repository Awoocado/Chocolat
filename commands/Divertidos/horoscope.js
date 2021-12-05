exports.run = async (client, message, args) => {

    let amor = Math.round(Math.random() * 100);
    let dinero = Math.round(Math.random() * 100);
    let suerte = Math.round(Math.random() * 100);
    let fortuna = Math.round(Math.random() * 100);
    let mensaje = (message.author.mention + ', tu horóscopo es el siguiente:\n' + `> Amor: ${amor}%, Salud: ${fortuna}%, Suerte: ${suerte}%, Dinero: ${dinero}%`);

    if (amor + dinero + suerte + fortuna == 400) mensaje = (message.author.mention + ', tu horóscopo es el siguiente:\n' + `> Amor: ${amor}%, Salud: ${fortuna}%, Suerte: ${suerte}%, Dinero: ${dinero}%\n¡¿Q-qué?! ¡¿Todas al 100%?! ¡Has logrado algo imposible! :O`)
    message.channel.createMessage(mensaje);
};

exports.config = {
    command: 'horoscope',
    category: 'Comandos Divertidos',
    permissions: 'Ninguno',
    description: 'Obtén valores aleatorios de "Amor, Salud, Suerte y Dinero". Los valores cambian cada vez que ejecutes el comando, por lo cual no representa ningún horóscopo real.',
    usage: '{prefix}horoscope',
    example: '',
    aliases: ['myday'],
    developerOnly: false,
    allowedToDisable: true,
    visible: true,
    cooldown: 2000
};