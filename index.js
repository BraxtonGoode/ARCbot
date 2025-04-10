const { Client, Events, GatewayIntentBits, SlashCommandBuilder } = require('discord.js');
require('dotenv').config();
const express = require('express');  // Import Express
const app = express();              // Create an Express app

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const sokkaCommand = new SlashCommandBuilder()
  .setName('sokka')
  .setDescription('Replies with "Katarra"')
  .toJSON(); // required for REST API

client.once(Events.ClientReady, async (c) => {
  console.log(`Logged in as ${c.user.username}`);

  // Register the slash command
  const rest = new (require('discord.js')).REST({ version: '10' }).setToken(process.env.TOKEN);

  try {
    console.log('Registering slash command...');
    await rest.put(
      require('discord.js').Routes.applicationCommands(c.user.id), // Global command
      { body: [sokkaCommand] }
    );
    console.log('Slash command registered.');
  } catch (err) {
    console.error('Error registering slash command:', err);
  }
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'sokka') {
    await interaction.reply('Katarra');
  }
});

// Create a simple route to keep the service alive
app.get('/', (req, res) => {
  res.send('Bot is running!');
});

// Make the bot respond to requests on Render's port
app.listen(process.env.PORT || 3000, () => {
  console.log('Web server running on port 3000');
});

client.login(process.env.TOKEN);
