const Eris = require("eris-additions")(require("eris"));
const weather = require('weather-js');
exports.run = async (client, message, args) => {
    let currentHour = new Date().getUTCHours();
    let currentMin = new Date().getUTCMinutes();

    if (!args.join(' ')) return message.channel.createMessage(':x: | Debes escribir alguna localidad.').then(m => setTimeout(() => m.delete(), 6000))
    weather.find({
        search: args.join(' '),
        degreeType: 'C'
    }, function (err, result) {
        if (err) return message.channel.createMessage(`Ocurrió un error al tratar de ejecutar el comando.\nDetalles del error: \`${err}\``);
        if (result === undefined || result.length === 0) {
           return message.channel.createMessage(':x: | Localidad no encontrada. Escribe una localidad válida.').then(m => setTimeout(() => m.delete(), 6000))
        };

        let current = result[0].current;
        let location = result[0].location;
        let locationn = parseInt((location.timezone).match(/\d+/)[0])
        if (location.timezone.startsWith("-")) locationn = locationn*-1;
        let embed = new Eris.Embed()
          .description(`**${current.skytext}**`)
          .author(`Clima de ${current.observationpoint}`)
          .thumbnail(current.imageUrl)
          .color(Math.floor(Math.random() * 0xffffff))
          .field('Coordenadas', `${location.lat}, ${location.long}`, true)
        if (location.timezone.startsWith("-")) embed.field('Zona Horaria', `GMT${location.timezone}`, true);
        else embed.field('Zona Horaria', `GMT+${location.timezone}`, true);
        if (currentHour + locationn < 0) embed.field('Hora', `${(currentHour + locationn) + 24}` + `:` + `${currentMin}`, true);
        else if (currentHour + locationn >= 24) embed.field('Hora', `${(currentHour + locationn) - 24}` + `:` + `${currentMin}`, true);
        else embed.field('Hora', `${(currentHour + locationn)}` + `:` + `${currentMin}`, true);
        embed.field('Tipo de Grado', 'Grado Celsius (ºC)', true);
        embed.field('Temperatura', `${current.temperature} ºC`, true);
        embed.field('Se siente como', `${current.feelslike} ºC`, true);
        embed.field('Vientos', current.winddisplay, true);
        embed.field('Humedad', `${current.humidity}%`, true);
        message.channel.createMessage({ embed });
    });
};

exports.config = {
    command: 'weather',
    category: 'Comandos Útiles',
    permissions: 'Ninguno',
    description: 'Busca el reporte del clima de alguna localidad.',
    usage: '{prefix}weather <localidad>',
    example: '{prefix}weather Londres\n\nEsto buscará el reporte del clima de la ciudad "Londres".',
    aliases: ['clime', 'climate'],
    developerOnly: false,
    allowedToDisable: true,
    visible: true,
    cooldown: 15000
};