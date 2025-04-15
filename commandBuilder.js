const { SlashCommandBuilder } = require("discord.js");
const fs = require("fs");

// Read character names from JSON, ensure data is properly loaded
let characters = {};
try {
    characters = JSON.parse(fs.readFileSync("./characters.json", "utf8"));
} catch (err) {
    console.error("Error reading characters.json:", err);
}

let tips = {};
try {
    tips = JSON.parse(fs.readFileSync("./tips.json", "utf8"));
} catch (err) {
    console.error("Error reading tips.json:", err);
}

// Generate commands for each character if they exist
const commands = Object.keys(characters).map((name) => {
    return new SlashCommandBuilder()
        .setName(name.toLowerCase())
        .setDescription(`Interact with ${name.charAt(0).toUpperCase() + name.slice(1)}!`)
        .addSubcommand(subcommand =>
            subcommand
                .setName("talent-tree")
                .setDescription(`View ${name.charAt(0).toUpperCase() + name.slice(1)}'s talent tree`)
        )
        .toJSON();
}).filter(cmd => cmd); // Filter out any undefined or empty commands

// Create one slash command for each tip entry if tips exist
const tipCommands = Object.values(tips).map((tip) => {
    return new SlashCommandBuilder()
        .setName(tip.name.toLowerCase().replace(/\s+/g, "-")) // Sanitize the tip name
        .setDescription(`Get the ${tip.name} tip!`)
        .toJSON();
}).filter(cmd => cmd); // Filter out any undefined or empty commands

module.exports = { commands, tipCommands };
