const { EmbedBuilder } = require("discord.js");
const fs = require('fs');

const characters = JSON.parse(fs.readFileSync('characters.json', 'utf8'));

async function skills(interaction, characterName) {
    console.log(`Skill command received for ${characterName}`);

    // Convert characterName to lowercase to check against the JSON data
    const lowerCaseCharacterName = characterName.toLowerCase();

    // Check if character exists in the JSON data
    if (characters[lowerCaseCharacterName]) {
        const character = characters[lowerCaseCharacterName];

        const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle(character.name.toUpperCase()) // Uppercase the character's name for the embed title
            .setDescription(`This is the order of skills for ${character.name.toUpperCase()}:`)
            .addFields({
            name: 'Skills',
            value: character.skills.join('\n'),
            })
            
        const embed2 = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle("Skills are provided by Kuvira last updated on 15/5/2025 (dd/mm/yyyy)");

        await interaction.reply({ embeds: [embed, embed2] });
    } else {
        await interaction.reply(`Character "${characterName}" not found.`);
    }
}

module.exports = {
    skills
};
