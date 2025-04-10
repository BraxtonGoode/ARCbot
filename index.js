const { Client, Events, GatewayIntentBits, SlashCommandBuilder, REST, Routes } = require("discord.js");
require('dotenv').config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const sokkaCommand = new SlashCommandBuilder()
    .setName("sokka")
    .setDescription("Replies with 'Katarra'")
    .toJSON(); // required for REST API

client.once(Events.ClientReady, async (c) => {
    console.log(`Logged in as ${c.user.username}`);

    // Register the slash command (use application.commands for global, or guild-based for testing)
    const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

    try {
        console.log('Registering slash command...');

        await rest.put(
            Routes.applicationCommands(c.user.id), // For global command
            // Routes.applicationGuildCommands(c.user.id, 'YOUR_GUILD_ID'), // for quicker updates during testing
            { body: [sokkaCommand] }
        );

        console.log('Slash command registered.');
    } catch (err) {
        console.error('Error registering slash command:', err);
    }
});

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === "sokka") {
        await interaction.reply("Katarra");
    }
});

client.login(process.env.TOKEN);
