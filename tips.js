const { EmbedBuilder } = require("discord.js");
const fs = require('fs');

// Read the tips JSON file once on startup (optimized)
const tips = JSON.parse(fs.readFileSync('tips.json', 'utf8'));

async function generalTips(interaction, tipName) {
    console.log(`General tip for ${tipName}`);

    if (tips[tipName]) {
        const tip = tips[tipName];

        // Start building the embed
        const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle(tip.name)
            .setDescription(tip.Content);

        // Check if a Pro Tip exists and append it to the embed
        if (tip["Pro Tip"]) {
            embed.addFields(
                { name: 'Pro Tip', value: tip["Pro Tip"], inline: false }
            );
        }

        await interaction.reply({ embeds: [embed] });
    } else {
        await interaction.reply(`General tip on "${tipName}" was not found.`);
    }
}

module.exports = { generalTips };
