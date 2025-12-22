import { Client, CommandInteraction, ChatInputApplicationCommandData } from "discord.js"

export interface Command extends ChatInputApplicationCommandData {
    run: (client: Client, interaction: CommandInteraction) => void
}