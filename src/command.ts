import { SlashCommandBuilder, SlashCommandOptionsOnlyBuilder, ChatInputCommandInteraction } from "discord.js"

export interface Command  {
    data: SlashCommandBuilder | SlashCommandOptionsOnlyBuilder
    execute: (interaction: ChatInputCommandInteraction) => Promise<void>
}