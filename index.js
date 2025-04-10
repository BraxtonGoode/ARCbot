const { Client, Events, GatewayIntentBits, REST, Routes, EmbedBuilder, AttachmentBuilder } = require("discord.js");
const { sokkaCommand, tenzinCommand } = require("./commandBuilder"); // Import the command builder
const express = require('express');
require('dotenv').config();
const path = require('path');  // Import path module to handle file paths


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
        if (interaction.options.getSubcommand() === 'talent-tree') {
            try {
                console.log("Current working directory: ", __dirname);

                // Get the path to the local image file (adjust the filename as necessary)
                const imagePath = path.join(__dirname, 'images', 'tenzin_talent_tree_1.png'); // Path to your image

                // Create an AttachmentBuilder to attach the image from the local path
                const file = new AttachmentBuilder(imagePath);

                // Create the embed with the image
                const embed = new EmbedBuilder()
                    .setColor(0x0099FF)
                    .setTitle("Tenzin's Talent Tree Part 1")
                    .setImage('attachment://tenzin_talent_tree_1.png'); // Ensure this matches the image filename

                await interaction.deferReply();

                setTimeout(async () => {
                    // Reply with the embed and the attached image
                    await interaction.editReply({ embeds: [embed], files: [file] });
                }, 1000); // Simulate a delay of 1 second for processing

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
