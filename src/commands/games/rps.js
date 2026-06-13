import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName('rps')
    .setDescription('Play Rock, Paper, Scissors against the bot')
    .addStringOption(option =>
        option.setName('choice')
            .setDescription('Your choice')
            .setRequired(true)
            .addChoices(
                { name: 'Rock', value: 'rock' },
                { name: 'Paper', value: 'paper' },
                { name: 'Scissors', value: 'scissors' }
            )
    )
    .setDMPermission(true);

export async function execute(interaction) {
    const choices = ['rock', 'paper', 'scissors'];
    const userChoice = interaction.options.getString('choice');
    const botChoice = choices[Math.floor(Math.random() * choices.length)];

    let result;
    if (userChoice === botChoice) {
        result = "It's a tie! 🤝";
    } else if (
        (userChoice === 'rock' && botChoice === 'scissors') ||
        (userChoice === 'paper' && botChoice === 'rock') ||
        (userChoice === 'scissors' && botChoice === 'paper')
    ) {
        result = 'You win! 🎉';
    } else {
        result = 'Bot wins! 🤖';
    }

    const embed = {
        color: 0x0099ff,
        title: '✋ Rock, Paper, Scissors',
        fields: [
            { name: 'Your Choice', value: userChoice, inline: true },
            { name: 'Bot Choice', value: botChoice, inline: true },
            { name: 'Result', value: result, inline: false }
        ],
        timestamp: new Date()
    };

    await interaction.reply({ embeds: [embed] });
}
