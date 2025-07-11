const { EmbedBuilder } = require("discord.js");
const fs = require('fs');

// Read the tips JSON file once on startup (optimized)
const tips = JSON.parse(fs.readFileSync('tips.json', 'utf8'));

// Utility to unsanitize the tip name (e.g., "relocation-tip" -> "Relocation Tip")
function unsanitizeTipName(sanitizedName) {
    return sanitizedName
        .replace(/-/g, ' ')
        .replace(/\b\w/g, char => char.toUpperCase());
}

// Utility to detect if a string is probably an image URL
function isProbablyImage(url) {
    return typeof url === 'string' && (
        url.includes('cdn.discordapp.com') ||
        url.match(/\.(png|jpg|jpeg|gif|webp)$/i)
    );
}

// Remove query parameters (e.g., Discord CDN tokens) from image URLs
function cleanImageURL(url) {
    return url.split('?')[0];
}

// Main function for handling general tips
async function generalTips(interaction, sanitizedTipName) {
    console.log(`General tip for ${sanitizedTipName}`);

    const tipName = unsanitizeTipName(sanitizedTipName);

    if (tips[tipName]) {
        const tip = tips[tipName];
        const embed = new EmbedBuilder().setColor(0x0099FF).setTitle(tip.name);

        // Decide whether to use setImage or setDescription for the main content
        if (isProbablyImage(tip.Content)) {
            embed.setImage(cleanImageURL(tip.Content));
        } else {
            embed.setDescription(tip.Content);
        }

        // Add Pro Tip if available, check if it's an image URL
        if (tip["Pro Tip"]) {
            const proTipContent = tip["Pro Tip"];
            if (isProbablyImage(proTipContent)) {
                embed.addFields({ name: 'Pro Tip', value: '\u200B', inline: false }); // Empty value to only show the image
                embed.setImage(cleanImageURL(proTipContent));  // Set the image as Pro Tip
            } else {
                embed.addFields({ name: 'Pro Tip', value: proTipContent, inline: false });
            }
        }

        await interaction.reply({ embeds: [embed] });
    } else {
        await interaction.reply(`General tip on "${tipName}" was not found.`);
    }
}

module.exports = { generalTips };

