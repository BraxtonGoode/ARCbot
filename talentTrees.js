export async function tenzinTree(interaction) {
        if (interaction.options.getSubcommand() === 'talent-tree') {
            try {

                // Create the embed with the image
                const embed = new EmbedBuilder()
                    .setColor(0x0099FF)
                    .setTitle("Tenzin's Talent Tree Part 1")
                    .setImage('https://media.discordapp.net/attachments/1351788502265630750/1354496468475580578/IMG_5245.png?ex=67f94723&is=67f7f5a3&hm=062c7e09b8ef791533445df6f287dd608137229f6bc47c5694c05bb418972fd8&=&format=webp&quality=lossless&width=2408&height=1113'); // Ensure this matches the image filename

                await interaction.deferReply();

                setTimeout(async () => {
                    // Reply with the embed and the attached image
                    await interaction.editReply({ embeds: [embed]});
                }, 1000); // Simulate a delay of 1 second for processing

            } catch (error) {
                console.error('Error handling interaction:', error);
            }
        }
}

