const { Client, Events, GatewayIntentBits, REST, Routes } = require("discord.js");
const { sokkaCommand, tenzinCommand } = require("./commandBuilder"); // Import the command builder
const { tenzinTree, sokkaTree } = require("./talentTrees.js"); // Import the talent tree function
const express = require('express');
require('dotenv').config();


const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, async (c) => {
    console.log(`Logged in as ${c.user.username}`);
    const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

    try {
        console.log('Registering slash commands...');
        await rest.put(
            Routes.applicationCommands(c.user.id),  // Global command
            { body: [sokkaCommand, tenzinCommand] }
        );
        console.log('Slash command registered.');
    } catch (err) {
        console.error('Error registering slash command:', err);
    }
});

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isCommand()) return;

    if (interaction.commandName === 'tenzin') {
        await tenzinTree(interaction); // Call the function to handle Tenzin's talent tree command
    }
    if (interaction.commandName === 'sokka') {
        await sokkaTree(interaction); // Call the function to handle Tenzin's talent tree command
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
