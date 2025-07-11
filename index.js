const {
  Client,
  Events,
  GatewayIntentBits,
  REST,
  Routes,
} = require('discord.js');
const { commands, tipCommands, all } = require('./commandBuilder.js');
const { talentTree } = require('./talentTrees.js'); // Import the talent tree function
const { generalTips } = require('./tips.js'); // Import the tips function
const { displayCommands } = require('./allCommands.js'); // Import the display commands function
const { skills } = require('./characterSkills.js'); // Import the skills function
const express = require('express');
require('dotenv').config();

const fs = require('fs');


// Read the characters JSON file
let characters = {};
try {
  const data = fs.readFileSync('./characters.json', 'utf8');
  characters = JSON.parse(data);
} catch (err) {
  console.error('Error reading characters.json:', err);
}

if (!characters || Object.keys(characters).length === 0) {
  console.error('No characters data found.');
}

// read the tips JSON file
let tips = {};
try {
  const data = fs.readFileSync('./tips.json', 'utf8');
  tips = JSON.parse(data);
} catch (err) {
  console.error('Error reading tips.json:', err);
}
if (!tips || Object.keys(tips).length === 0) {
  console.error('No tips data found.');
}

// check if any problems then logs it on railway
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Check if the token is provided
if (!process.env.TOKEN) {
  console.error('Bot token is missing or invalid!');
  process.exit(1); // Exit the program with error code
}

// Log the token to verify it is loaded correctly
console.log('Bot token:', process.env.TOKEN);

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.once(Events.ClientReady, async (c) => {
  console.log(`Logged in as ${c.user.username}`);

  // Only register commands if the token is available
  if (!process.env.TOKEN) {
    console.error('No token available during bot startup');
    return;
  }
  const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

  try {
    console.log('Registering slash commands...');

    // Flatten the arrays and ensure they are all in proper JSON format
    const allCommands = [commands, tipCommands, all].flat();

    // Check if the structure is as expected before sending
    console.log('Commands to register:', allCommands);

    // Send the request with the flattened array of commands
    await rest.put(
      Routes.applicationCommands(client.user.id), // Register global commands
      {
        body: allCommands, // Flattened array directly
      }
    );
    console.log('Slash commands registered.');
  } catch (err) {
    console.error('Error registering slash command:', err);
  }
});

client.on('interactionCreate', async (interaction) => {
  if (interaction.isCommand()) {
    try {
      const commandName = interaction.commandName;

      // Handle character subcommands
      if (Object.keys(characters).includes(commandName)) {
        const sub = interaction.options.getSubcommand();
        console.log(`Character command: ${commandName}, subcommand: ${sub}`);

        if (sub === 'talent-tree') {
          await talentTree(interaction, commandName);
        } else if (sub === 'skills') {
          await skills(interaction, commandName);
        } else {
          await interaction.reply({
            content: 'Unknown subcommand.',
            ephemeral: true,
          });
        }
        return;
      }

      // Handle tip commands
      for (const tip of Object.values(tips)) {
        // Sanitize the command name for the comparison
        const sanitizedTipName = tip.name.toLowerCase().replace(/\s+/g, '-');

        if (interaction.commandName === sanitizedTipName) {
          console.log(`Tip command received: ${interaction.commandName}`);
          // If the command matches a tip, call the generalTips function
          await generalTips(interaction, sanitizedTipName);
        }
      }
      if (interaction.commandName === 'all') {
        await displayCommands(interaction);
      }
    } catch (error) {
        console.error('Error handling interaction:', error);
        await interaction.reply({
            content: 'An error occurred while processing your command.',
            ephemeral: true,
        });
    }
  }
});

// Start the Express server (port 3000)
const app = express();

app.get('/', (req, res) => {
  res.send('Bot is running!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Log in with the bot token, using the token from environment variables
client.login(process.env.TOKEN).catch((err) => {
  console.error('Failed to log in:', err);
  process.exit(1); // Exit if login fails
});