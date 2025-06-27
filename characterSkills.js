const { EmbedBuilder } = require("discord.js");
const fs = require('fs');

const characters = JSON.parse(fs.readFileSync('characters.json', 'utf8'));

async function skills(interaction, characterName) {
  try {
    console.log(`Skill command received for ${characterName}`);
    const lowerCaseCharacterName = characterName.toLowerCase();

    if (characters[lowerCaseCharacterName]) {
      const character = characters[lowerCaseCharacterName];

      const embed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle(character.name.toUpperCase())
        .setDescription(`This is the order of skills for ${character.name.toUpperCase()}:`)
        .addFields({
          name: 'Skills',
          value: Array.isArray(character.skills)
            ? character.skills.join('\n')
            : 'No skills data available.',
        });

      const embed2 = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle("Skills are provided by Kuvira last updated on 27/6/2025 (dd/mm/yyyy)");

      await interaction.reply({ embeds: [embed, embed2] });
    } else {
      await interaction.reply(`Character "${characterName}" not found.`);
    }
  } catch (err) {
    console.error('Error in skills command:', err);
    await interaction.reply({
      content: 'Something went wrong while fetching skills.',
      ephemeral: true,
    });
  }
}


module.exports = {
    skills
};
