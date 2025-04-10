const { Client, Events, GatewayIntentBits, REST, Routes, EmbedBuilder, AttachmentBuilder } = require("discord.js");
const { sokkaCommand, tenzinCommand } = require("./commandBuilder.js");
const express = require('express');
const path = require('path'); // Import the path module
require('dotenv').config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, async (c) => {
    console.log(`Logged in as ${c.user.username}`);

    // Register the main command with subcommands
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

    // Handling /tenzin command
    if (interaction.commandName === 'tenzin') {
        if (interaction.options.getSubcommand() === 'talent-tree') {
            try {
                // Define the path to the local image
                const imagePath = path.join(__dirname, 'images', 'tenzin_talent_tree_part_1.png'); // Change this to your actual image name

                // Create an AttachmentBuilder to attach the image
                const file = new AttachmentBuilder(imagePath);

                // Create an Embed for the image
                const embed = new EmbedBuilder()
                    .setColor(0x0099FF)
                    .setTitle("Tenzin's Talent Tree Part 1")
                    .setImage('attachment://tenzin_talent_tree_part_1.png'); // Ensure this matches the image filename

                // 1. Defer the reply immediately after receiving the interaction
                await interaction.deferReply();

                // 2. Simulate some processing (e.g., fetching data or working with APIs)
                setTimeout(async () => {
                    // 3. After processing, send the final reply with both embeds
                    // Send the message with the embed and image
                    await interaction.reply({ embeds: [embed], files: [file] });
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
