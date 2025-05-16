const { EmbedBuilder } = require('discord.js');
const fs = require('fs');

// Load character and tip data
const characters = JSON.parse(fs.readFileSync('characters.json', 'utf8'));
const tips = JSON.parse(fs.readFileSync('tips.json', 'utf8'));

async function displayCommands(interaction) {
  console.log(`Displaying all commands`);

  // Only include characters with talent trees (assuming all have talent trees)
  const listOfCharacters =
    Object.keys(characters)
      .map((name) => `• \`/${name.toLowerCase()} talent-tree\``)
      .join('\n') || 'No character commands available.';

  const listOfSkills = Object.entries(characters)
    .filter(
      ([_, data]) =>
        Array.isArray(data.skills) &&
        data.skills.some(
          (skill) => skill.toLowerCase() !== 'still in the works'
        )
    )
    .map(([name]) => `• \`/${name.toLowerCase()} skills\``)
    .join('\n');

  // Only include tips if any exist
  const listOfTips =
    Object.keys(tips)
      .map((name) => `• \`/${name.toLowerCase().replace(/\s+/g, '-')}\``)
      .join('\n') || 'No tip commands available.';

  // Build the embed fields dynamically to skip empty ones
  const fields = [
    { name: '👤 Character Commands', value: listOfCharacters, inline: false },
  ];

  if (listOfSkills && listOfSkills.length > 0) {
    fields.push({
      name: '🛠️ Skills Commands',
      value: listOfSkills,
      inline: false,
    });
  }

  if (listOfTips && listOfTips.length > 0) {
    fields.push({ name: '💡 Tip Commands', value: listOfTips, inline: false });
  }

  const embed = new EmbedBuilder()
    .setColor(0x0099ff)
    .setTitle('📜 AVAILABLE COMMANDS')
    .setDescription('Use these slash commands to interact with the bot:')
    .addFields(fields)
    .setFooter({ text: 'Use /[command] to get started!' });

  await interaction.reply({ embeds: [embed] });
}

module.exports = {
  displayCommands,
};
