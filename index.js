const {Client, Events, SlashCommandBuilder} = require("discord.js");
const {token} = require("./config.json");


const client = new Client({intents:[]});

client.once(Events.ClientReady, c => {
    console.log(`Logged in as ${c.user.username}`);

    const sokka = new SlashCommandBuilder()
        .setName("sokka")
        .setDescription("Replies with katarra");
        client.application.commands.create(sokka)     
})

client.on(Events.InteractionCreate, async interaction =>{
    if (interaction.commandName === "sokka"){
        await interaction.reply("Katarra")
    }

})
client.login(token)