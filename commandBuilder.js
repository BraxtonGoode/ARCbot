const {SlashCommandBuilder} = require("discord.js");




const sokkaCommand = new SlashCommandBuilder()
    .setName("sokka")
    .setDescription("Interact with Sokka!")
    .addSubcommand(subcommand =>
        subcommand
            .setName("talent-tree")
            .setDescription("View Sokka's talent tree"))
    .toJSON(); // This is required for the REST API

const tenzinCommand = new SlashCommandBuilder()
    .setName("tenzin")
    .setDescription("Interact with Tenzin!")
    .addSubcommand(subcommand =>
        subcommand
            .setName("talent-tree")
            .setDescription("View Tenzin's talent tree"))
    .toJSON(); // This is required for the REST API

const kyoshiCommand = new SlashCommandBuilder()
.setName("kyoshi")
.setDescription("Interact with Kyoshi!")
.addSubcommand(subcommand =>
    subcommand
        .setName("talent-tree")
        .setDescription("View Kyoshi's talent tree"))
.toJSON(); // This is required for the REST API

module.exports = {
    sokkaCommand,
    tenzinCommand,
    kyoshiCommand   
};
