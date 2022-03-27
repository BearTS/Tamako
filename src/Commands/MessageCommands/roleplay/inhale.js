const { join } = require('path');
const request = require('node-superfetch');
const { validate, parse } = require(join(__dirname, '..', '..', '..', 'Utils', 'types', 'user.js'));

module.exports = {
    name: 'inhale',
    aliases: [],
    description: 'Inhales a user.',
    ownerOnly: false,
    cooldown: 3000,
    userPermissions: ['SEND_MESSAGES'],
    clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
    category: 'Roleplay',
    usage: '[user]',
    run: async (client, message, [ user ], container) => {

        if (!user) return message.reply('Baka! Mention a user to inhale');
        if (!validate(user, message)) return message.reply('Please provide a valid user.');
        user = parse(user, message);

        try {

            if (user.id === client.user.id) return message.reply(`_Baka!_ You cannot inhale me, ${message.author}.`);
            if (user.id === message.author.id) return message.reply(`_Baka!_ You cannot inhale yourself, ${message.author}.`);
            
            const data = await request.get(`${process.env.API_URL}/api/roleplay/inhale`);

            const embed = new container.Discord.MessageEmbed()
                .setColor('#FF5A51')
                .setImage(data.body.url)
                .setDescription(`${message.author} inhales ${user} but got no ability`)
                .setFooter({ text: `Roleplay Commands | Made by Bear#3437 | ©️ ${new Date().getFullYear()} Tamako`, iconURL: client.user.displayAvatarURL({ dynamic: true }) });

            return message.reply({ embeds: [embed] });


        } catch(err) {
            return message.reply({ content: `Let my developer know in the support server https://discord.gg/dDnmY56 or using \`${container.Config.prefix[0]}feedback\` command`, embeds: [ 
                new container.Discord.MessageEmbed()
                    .setColor('RED')
                    .setTitle('Error')
                    .setDescription(`\`${err}\``)
                    .setFooter({ text: `Error Occured | Made by Bear#3437 | ©️ ${new Date().getFullYear()} Tamako`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })]
            });
        }
    }   
};

/**
 * @INFO
 * Bot Coded by Bear#3437 | https://github.com/bearts
 * @INFO
 * Tamako Tech | https://tamako.tech/
 * @INFO
 */
