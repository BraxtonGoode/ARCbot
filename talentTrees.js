const { EmbedBuilder } = require("discord.js");
const fs = require('fs');

const characters = JSON.parse(fs.readFileSync('characters.json', 'utf8'));

async function talentTree(interaction, characterName) {
    console.log(`Talent tree command received for ${characterName}`);
    // Check if character exists in the JSON data
    if (characters[characterName]) {
        const character = characters[characterName];

        const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle(character.name.ToUpperCase())
            .setDescription(`Here is the first part of the talent tree for ${character.name}:`)
            .setImage(character.image1)  // Modify as needed to show the right image

            const embed2 = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle(character.name.ToUpperCase())
            .setDescription(`Here is the second part of the talent tree for ${character.name}:`)
            .setImage(character.image2)  // Modify as needed to show the right image  

            const embed3 = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle("Talent trees are provided by Kuvira last updated on 22/4/2023 (dd/mm/yyyy)")


        await interaction.reply({ embeds: [embed, embed2, embed3] });
    } else {
        await interaction.reply(`Character "${characterName}" not found.`);
    }
}

module.exports = {
    talentTree
};
