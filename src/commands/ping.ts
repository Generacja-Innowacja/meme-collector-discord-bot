import { Client, CommandInteraction, MessageFlags } from "discord.js"
import { Command } from "../command"

export const Ping: Command = {
    name: "ping",
    description: "Replies with pong!",
    run: async (client: Client, interaction: CommandInteraction) => {
        await interaction.reply({
            content: `Pong! ${interaction.client.ws.ping}ms`,
            flags: MessageFlags.Ephemeral
        })
    }
}