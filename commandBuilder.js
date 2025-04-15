const { SlashCommandBuilder } = require("discord.js");
const fs = require("fs");

// Read character names from JSON
const characters = JSON.parse(fs.readFileSync("./characters.json", "utf8"));
const tips = JSON.parse(fs.readFileSync("./tips.json", "utf8"));

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

// Create one slash command for each tip entry
const tipCommands = Object.values(tips).map((tip) =>
  new SlashCommandBuilder()
    .setName(tip.name.toLowerCase().replace(/\s+/g, "-")) // e.g., "Relocation Tip" -> "relocation-tip"
    .setDescription(`Get the ${tip.name} tip!`)
    .toJSON()
)

module.exports = { commands, tipCommands };
