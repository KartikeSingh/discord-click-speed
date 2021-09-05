const { User, MessageActionRow, MessageButton, Message } = require("discord.js");

/**
 * Module to Start the game
 * @param {Message} message The Message | Command Interaction, in which command was used
 * @param {User} player2 
 */
module.exports = async function start(message, player2, party) {
    const rows = [new MessageActionRow().addComponents(new MessageButton().setLabel("\u200b").setEmoji(this.emoji).setStyle("SUCCESS").setCustomId("click_speed_button"))]

    let msg = await message.channel.send({ embeds: [{ color: "AQUA", title: this.ready }] });

    await new Promise((resolve) => setTimeout(resolve, this.startTime === "random" ? Math.floor(Math.random() * 1500 + 2500) : this.startTime));

    const filter = party ? (i) => i.message.id === msg.id && !i.user.bot : (i) => i.message.id === msg.id && (i.user.id === message.author.id || i.user.id === player2?.id), data = new Map();

    msg.edit({ embeds: [{ color: "GREYPLE", title: this.started }], components: rows });

    const collector = message.channel.createMessageComponentCollector({ filter: filter, time: this.endTime, message: msg });

    collector.on('collect', (interaction) => {
        data.has(interaction.user.id) ? data.set(interaction.user.id, { value: data.get(interaction.user.id).value + 1, name: interaction.user.username }) : data.set(interaction.user.id, { value: 1, name: interaction.user.username })
        interaction.reply({ ephemeral: true, content: `Click number : ${data.get(interaction.user.id).value}` });
    });

    collector.on('end', () => {
        let content = "", index = 1;

        data.forEach((v) => {
            content += `${index}.${v.name} : ${v.value}\t-\t\u200b${v.value / (this.endTime / 1000)}CPS\n`;
            index++;
        });

        if (content.length === 0) content = this.fail;
        else content = `\`\`\`Username\t\t\tClicks\t-\tCPS\n\n${content}\`\`\``;

        msg.edit({ components: [], embeds: [{ color: "GREEN", title: this.end, description: content }] })
    })
}