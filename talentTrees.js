const { EmbedBuilder } = require("discord.js");
const fs = require('fs');

const characters = JSON.parse(fs.readFileSync('characters.json', 'utf8'));

async function talentTree(interaction, characterName) {
    console.log(`Talent tree command received for ${characterName}`);
    
    // Make the character name uppercase for both the interaction and the embed
    const upperCaseCharacterName = characterName.toUpperCase();

    // Check if character exists in the JSON data
    if (characters[upperCaseCharacterName]) {
        const character = characters[upperCaseCharacterName];

        const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle(character.name.toUpperCase()) // Uppercase the character's name for the embed title
            .setDescription(`Here is the first part of the talent tree for ${character.name.toUpperCase()}:`)
            .setImage(character.image1);  // Modify as needed to show the right image

        const embed2 = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle(character.name.toUpperCase()) // Uppercase for second embed
            .setDescription(`Here is the second part of the talent tree for ${character.name.toUpperCase()}:`)
            .setImage(character.image2);  // Modify as needed to show the right image

        const embed3 = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle("Talent trees are provided by Kuvira last updated on 22/4/2023 (dd/mm/yyyy)");

        await interaction.reply({ embeds: [embed, embed2, embed3] });
    } else {
        await interaction.reply(`Character "${upperCaseCharacterName}" not found.`);
    }
}

module.exports = {
    talentTree
};
