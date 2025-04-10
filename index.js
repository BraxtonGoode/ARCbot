const { Client, Events, GatewayIntentBits, SlashCommandBuilder, REST, Routes, EmbedBuilder } = require("discord.js");
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
                // Send multiple embeds (images) one after the other
                const embed1 = new EmbedBuilder()
                .setColor(0x0099FF)
                .setTitle("Sokka's talent tree part 1")
                .setImage('https://cdn.discordapp.com/attachments/1351788502265630750/1352158339596816384/IMG_5158.png?ex=67f805d6&is=67f6b456&hm=57c808cfd17a0d49ce6a4c7ab30fdcbe5d80597b6ba2f2990cd670f7528aa968&');  // Replace with actual image URL

                const embed2 = new EmbedBuilder()
                .setColor(0x0099FF)
                .setTitle("Sokka's talent tree part 2")
                .setImage('https://cdn.discordapp.com/attachments/1351788502265630750/1352158340284813313/IMG_5159.png?ex=67f805d6&is=67f6b456&hm=92880d99de4b6a86eb418ef3ee2064622312df9a82bb694de5a459213287fc19&');  // Replace with actual image URL


                await interaction.editReply({ embeds: [embed1, embed2] });
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
