// const {SlashCommandBuilder} = require("discord.js");




// const sokkaCommand = new SlashCommandBuilder()
//     .setName("sokka")
//     .setDescription("Interact with Sokka!")
//     .addSubcommand(subcommand =>
//         subcommand
//             .setName("talent-tree")
//             .setDescription("View Sokka's talent tree"))
//     .toJSON(); // This is required for the REST API

// const tenzinCommand = new SlashCommandBuilder()
//     .setName("tenzin")
//     .setDescription("Interact with Tenzin!")
//     .addSubcommand(subcommand =>
//         subcommand
//             .setName("talent-tree")
//             .setDescription("View Tenzin's talent tree"))
//     .toJSON(); // This is required for the REST API

// const kyoshiCommand = new SlashCommandBuilder()
// .setName("kyoshi")
// .setDescription("Interact with Kyoshi!")
// .addSubcommand(subcommand =>
//     subcommand
//         .setName("talent-tree")
//         .setDescription("View Kyoshi's talent tree"))
// .toJSON(); // This is required for the REST API

// const korraCommand = new SlashCommandBuilder()
// .setName("korra")
// .setDescription("Interact with Korra!")
// .addSubcommand(subcommand =>
//     subcommand
//         .setName("talent-tree")
//         .setDescription("View Korra's talent tree"))
// .toJSON(); // This is required for the REST API

// const zukoCommand = new SlashCommandBuilder()
// .setName("zuko")
// .setDescription("Interact with Zuko!")
// .addSubcommand(subcommand =>
//     subcommand
//         .setName("talent-tree")
//         .setDescription("View Zuko's talent tree"))
// .toJSON(); // This is required for the REST API

// const azulaCommand = new SlashCommandBuilder()
// .setName("azula")
// .setDescription("Interact with Azula!")
// .addSubcommand(subcommand =>
//     subcommand
//         .setName("talent-tree")
//         .setDescription("View Azula's talent tree"))
// .toJSON(); // This is required for the REST API

// const bumiCommand = new SlashCommandBuilder()
// .setName("bumi")
// .setDescription("Interact with Bumi!")
// .addSubcommand(subcommand =>
//     subcommand
//         .setName("talent-tree")
//         .setDescription("View Bumi's talent tree"))
// .toJSON(); // This is required for the REST API

// const irohCommand = new SlashCommandBuilder()
// .setName("iroh")
// .setDescription("Interact with Iroh!")
// .addSubcommand(subcommand =>
//     subcommand
//         .setName("talent-tree")
//         .setDescription("View Iroh's talent tree"))
// .toJSON(); // This is required for the REST API

// const asamiCommand = new SlashCommandBuilder()
// .setName("asami")
// .setDescription("Interact with Asami!")
// .addSubcommand(subcommand =>
//     subcommand
//         .setName("talent-tree")
//         .setDescription("View Asami's talent tree"))
// .toJSON(); // This is required for the REST API

// const aangCommand = new SlashCommandBuilder()
// .setName("aang")
// .setDescription("Interact with Aang!")
// .addSubcommand(subcommand =>
//     subcommand
//         .setName("talent-tree")
//         .setDescription("View Aang's talent tree"))
// .toJSON(); // This is required for the REST API

// const katarraCommand = new SlashCommandBuilder()
// .setName("katara")
// .setDescription("Interact with Katara!")
// .addSubcommand(subcommand =>
//     subcommand
//         .setName("talent-tree")
//         .setDescription("View Katarra's talent tree"))
// .toJSON(); // This is required for the REST API

// const tophCommand = new SlashCommandBuilder()
// .setName("toph")   
// .setDescription("Interact with Toph!")
// .addSubcommand(subcommand =>
//     subcommand
//         .setName("talent-tree")
//         .setDescription("View Toph's talent tree"))
// .toJSON(); // This is required for the REST API

// const sukiCommand = new SlashCommandBuilder()
// .setName("suki")
// .setDescription("Interact with Suki!")
// .addSubcommand(subcommand =>
//     subcommand
//         .setName("talent-tree")
//         .setDescription("View Suki's talent tree"))
// .toJSON(); // This is required for the REST API

// const teoCommand = new SlashCommandBuilder()
// .setName("teo") 
// .setDescription("Interact with Teo!")
// .addSubcommand(subcommand =>
//     subcommand
//         .setName("talent-tree")
//         .setDescription("View Teo's talent tree"))
// .toJSON(); // This is required for the REST API

// const borteCommand = new SlashCommandBuilder()
// .setName("borte")
// .setDescription("Interact with Borte!")
// .addSubcommand(subcommand =>
//     subcommand
//         .setName("talent-tree")
//         .setDescription("View Borte's talent tree"))
// .toJSON(); // This is required for the REST API


// module.exports = {
//     sokkaCommand,
//     tenzinCommand,
//     kyoshiCommand,
//     korraCommand,
//     zukoCommand,
//     azulaCommand,
//     bumiCommand,
//     irohCommand,
//     asamiCommand,
//     aangCommand,
//     katarraCommand,
//     tophCommand,
//     sukiCommand,
//     teoCommand,
//     borteCommand  

// };

const { SlashCommandBuilder } = require("discord.js");
const fs = require("fs");

// Read character names from JSON
const characters = JSON.parse(fs.readFileSync("./characters.json", "utf8"));

// This will hold a flat array of SlashCommandBuilder JSONs
const commands = Object.keys(characters).map((name) =>
  new SlashCommandBuilder()
    .setName(name.toLowerCase())
    .setDescription(`Interact with ${name.charAt(0).toUpperCase() + name.slice(1)}!`)
    .addSubcommand(subcommand =>
      subcommand
        .setName("talent-tree")
        .setDescription(`View ${name.charAt(0).toUpperCase() + name.slice(1)}'s talent tree`)
    )
    .toJSON()
);

module.exports = { commands };
