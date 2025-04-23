const { EmbedBuilder } = require("discord.js");
const fs = require('fs');

const { EmbedBuilder } = require("discord.js");
const fs = require('fs');

// Read the tips JSON file once on startup
const tips = JSON.parse(fs.readFileSync('tips.json', 'utf8'));

// Function to unsanitize the tip name (reverse the sanitization)
function unsanitizeTipName(sanitizedName) {
    return sanitizedName
        .replace(/-/g, ' ')
        .replace(/\b\w/g, char => char.toUpperCase());
}

function isImageURL(str) {
    return /\.(jpg|jpeg|png|gif|webp)$/i.test(str);
}

async function generalTips(interaction, sanitizedTipName) {
    console.log(`General tip for ${sanitizedTipName}`);

    const tipName = unsanitizeTipName(sanitizedTipName);

    if (tips[tipName]) {
        const tip = tips[tipName];

        const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle(tip.name);

        // Check if the Content is an image URL or regular text
        if (isImageURL(tip.Content)) {
            embed.setImage(tip.Content);
        } else {
            embed.setDescription(tip.Content);
        }

        // Add Pro Tip if available
        if (tip["Pro Tip"]) {
            embed.addFields({
                name: 'Pro Tip',
                value: tip["Pro Tip"],
                inline: false
            });
        }

        await interaction.reply({ embeds: [embed] });
    } else {
        await interaction.reply(`General tip on "${tipName}" was not found.`);
    }
}

module.exports = { generalTips };
