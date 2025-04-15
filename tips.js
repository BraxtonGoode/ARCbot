const { EmbedBuilder } = require("discord.js");
const fs = require('fs');

const tips = JSON.parse(fs.readFileSync('tips.json', 'utf8'));

async function generalTips(interaction, tipName) {
    console.log(`Talent tree command received for ${tipName}`);

        if (tips[tipName]) {
            const tip = tips[tipName];
    
            const embed = new EmbedBuilder()
                .setColor(0x0099FF)
                .setTitle(tip.name)
                .setDescription(tip.Content)

    
    
            await interaction.reply({ embeds: [embed] });
        } else {
            await interaction.reply(`General tip on "${tipName}" was not found.`);
        }
}

module.exports = {
    generalTips
};