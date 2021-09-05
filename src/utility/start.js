const { User, MessageActionRow, MessageButton, Message } = require("discord.js");
const ms = require('ms');

/**
 * Module to Start the game
 * @param {Message} message The Message | Command Interaction, in which command was used
 * @param {User} player2 
 */
module.exports = async function start(message, player2, party) {
    const rows = [new MessageActionRow().addComponents(new MessageButton().setLabel("\u200b").setEmoji(this.emoji).setStyle("SUCCESS").setCustomId("click_speed_button"))]

    let msg = await message.channel.send({ embeds: [{ color: "AQUA", title: this.ready }] });

    await new Promise((resolve) => setTimeout(resolve, this.startTime === "random" ? Math.floor(Math.random() * 1500 + 2500) : this.startTime));

    const filter = party ? (i) => i.message.id === msg.id && !i.user.bot : (i) => i.message.id === msg.id && (i.user.id === message.author.id || i.user.id === player2?.id), data = {};

    msg.edit({ embeds: [{ color: "GREYPLE", title: this.started }], components: rows });

    const collector = message.channel.createMessageComponentCollector({ filter: filter, time: this.endTime, message: msg });

    collector.on('collect', (interaction) => data[interaction.user.username] ? data[interaction.user.username]++ : data[interaction.user.username] = 1);

    collector.on('end', () => {
        let content = "";
        Object.keys(data).forEach((v, i) => {
            content += `${i + 1}**${v}** : ${Object.values(data)[i]}\t${Object.values(data)[i] / (this.endTime / 1000)}\n`;
        })

        if (content.length === 0) content = this.fail;
        else content = `Username\tClicks\tCPS\n\n`;

        msg.edit({ components: [], embeds: [{ color: "GREEN", title: this.end, description: content }] })
    })
}