const { Client, Events, GatewayIntentBits, REST, Routes } = require("discord.js");
const { commands, tipCommands } = require("./commandBuilder.js");
const { talentTree } = require("./talentTrees.js"); // Import the talent tree function
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


const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.once(Events.ClientReady, async (c) => {
    console.log(`Logged in as ${c.user.username}`);
    const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

    try {
        console.log('Registering slash commands...');
        
        // Flatten the arrays and ensure they are all in proper JSON format
        const allCommands = [commands, tipCommands];

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
        // Loop through all the character names in the JSON file
        Object.keys(characters).forEach(async (characterName) => {
            if (interaction.commandName === characterName) {
                console.log(`Command received: ${interaction.commandName}`);
                // If the command name matches a character, call the talentTree function to handle the command
                await talentTree(interaction, characterName); // Passing character name as an argument if needed
            }
        });
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
