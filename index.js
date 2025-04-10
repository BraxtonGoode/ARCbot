const { Client, Events, GatewayIntentBits, SlashCommandBuilder, REST, Routes } = require("discord.js");
const express = require('express');
require('dotenv').config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const sokkaCommand = new SlashCommandBuilder()
    .setName("sokka")
    .setDescription("Interact with Sokka!")
    .addSubcommand(subcommand =>
        subcommand
            .setName("talent-tree")
            .setDescription("View Sokka's talent tree"))
    .toJSON(); // This is required for the REST API

client.once(Events.ClientReady, async (c) => {
    console.log(`Logged in as ${c.user.username}`);

    // Register the main command with subcommands
    const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

    try {
        console.log('Registering slash commands...');
        await rest.put(
            Routes.applicationCommands(c.user.id),  // Global command
            { body: [sokkaCommand] }
        );
        console.log('Slash command registered.');
    } catch (err) {
        console.error('Error registering slash command:', err);
    }
});

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isCommand()) return;

    // Handle the subcommand /sokka talent-tree
    if (interaction.commandName === 'sokka') {
        if (interaction.options.getSubcommand() === 'talent-tree') {
            try {
                // Defer the reply, this acknowledges the interaction and gives us time to respond
                await interaction.deferReply();

                // Simulating some processing (e.g., fetching data from an API)
                setTimeout(async () => {
                    await interaction.editReply("Sokka's Talent Tree: \n1. Boomerang Mastery\n2. Waterbending\n3. Strategy");
                }, 1000); // Simulating delay
            } catch (error) {
                console.error('Error handling interaction:', error);
            }
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

client.login(process.env.TOKEN);
