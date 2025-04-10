const {SlashCommandBuilder} = require("discord.js");




export const sokkaCommand = new SlashCommandBuilder()
    .setName("sokka")
    .setDescription("Interact with Sokka!")
    .addSubcommand(subcommand =>
        subcommand
            .setName("talent-tree")
            .setDescription("View Sokka's talent tree"))
    .toJSON(); // This is required for the REST API

export const tenzinCommand = new SlashCommandBuilder()
.setName("tenzin")
.setDescription("Interact with Tenzin!")
.addSubcommand(subcommand =>
    subcommand
        .setName("talent-tree")
        .setDescription("View Tenzin's talent tree"))
.toJSON(); // This is required for the REST API
