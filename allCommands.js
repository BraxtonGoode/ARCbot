const { EmbedBuilder } = require("discord.js");
const fs = require('fs');

// Load character and tip data
const characters = JSON.parse(fs.readFileSync('characters.json', 'utf8'));
const tips = JSON.parse(fs.readFileSync('tips.json', 'utf8'));

async function displayCommands(interaction) {
    console.log(`Displaying all commands`);

    const listOfCharacters = Object.keys(characters)
        .map(name => `• \`/${name.toLowerCase()} talent-tree\``)
        .join("\n") || "No character commands available.";

    const listOfSkills = Object.keys(characters)
        .map(name => `• \`/${name.toLowerCase()} skills\``)
        .join("\n") || "No skill commands available.";

    const listOfTips = Object.keys(tips)
        .map(name => `• \`/${name.toLowerCase().replace(/\s+/g, "-")}\``)
        .join("\n") || "No tip commands available.";

    

    const embed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle("📜 AVAILABLE COMMANDS")
        .setDescription("Use these slash commands to interact with the bot:")
        .addFields(
            { name: "👤 Character Commands", value: listOfCharacters, inline: false },
            { name: "🛠️ Skills Commands", value: listOfSkills, inline: false },
            { name: "💡 Tip Commands", value: listOfTips, inline: false }
        )
        .setFooter({ text: "Use /[command] to get started!" });

    await interaction.reply({ embeds: [embed] });
}

module.exports = {
    displayCommands
};

