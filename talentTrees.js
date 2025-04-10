const {EmbedBuilder } = require("discord.js");

async function tenzinTree(interaction) {
        if (interaction.options.getSubcommand() === 'talent-tree') {
            try {

                // Create the embed with the image
                const embed = new EmbedBuilder()
                    .setColor(0x0099FF)
                    .setTitle("Tenzin's Talent Tree Part 1")
                    .setImage('https://media.discordapp.net/attachments/1351788502265630750/1354496468475580578/IMG_5245.png?ex=67f94723&is=67f7f5a3&hm=062c7e09b8ef791533445df6f287dd608137229f6bc47c5694c05bb418972fd8&=&format=webp&quality=lossless&width=2408&height=1113'); // Ensure this matches the image filename
                
                // Create the embed with the image
                const embed2 = new EmbedBuilder()
                    .setColor(0x0099FF)
                    .setTitle("Tenzin's Talent Tree Part 2")
                    .setImage('https://media.discordapp.net/attachments/1351788502265630750/1354496469058588814/IMG_5246.png?ex=67f94723&is=67f7f5a3&hm=7ec924972764cfe7b2085444e702a538c6dee773c8d4daac8d692b73cf5fe0eb&=&format=webp&quality=lossless&width=2408&height=1113'); // Ensure this matches the image filename


                await interaction.deferReply();

                setTimeout(async () => {
                    // Reply with the embed and the attached image
                    await interaction.editReply({ embeds: [embed, embed2]});
                }, 1000); // Simulate a delay of 1 second for processing

            } catch (error) {
                console.error('Error handling interaction:', error);
            }
        }
}
async function sokkaTree(interaction) {
    if (interaction.options.getSubcommand() === 'talent-tree') {
        try {

            // Create the embed with the image
            const embed = new EmbedBuilder()
                .setColor(0x0099FF)
                .setTitle("Sokka's Talent Tree Part 1")
                .setImage('https://cdn.discordapp.com/attachments/1351788502265630750/1352158339596816384/IMG_5158.png?ex=67f95756&is=67f805d6&hm=9dafdd5b6f4fd6a4dfd77c53e7a838b4ca5998c99774082d5eebb0fb188e184c&'); // Ensure this matches the image filename
            
            // Create the embed with the image
            const embed2 = new EmbedBuilder()
                .setColor(0x0099FF)
                .setTitle("Sokka's Talent Tree Part 2")
                .setImage('https://cdn.discordapp.com/attachments/1351788502265630750/1352158340284813313/IMG_5159.png?ex=67f95756&is=67f805d6&hm=58ac89efe5e76b20bb8a85215add4037c5e341fc65c8a9a79c8729f07e355f08&'); // Ensure this matches the image filename


            await interaction.deferReply();

            setTimeout(async () => {
                // Reply with the embed and the attached image
                await interaction.editReply({ embeds: [embed, embed2]});
            }, 1000); // Simulate a delay of 1 second for processing

        } catch (error) {
            console.error('Error handling interaction:', error);
        }
    }
}

module.exports = {
    tenzinTree,
    sokkaTree
};