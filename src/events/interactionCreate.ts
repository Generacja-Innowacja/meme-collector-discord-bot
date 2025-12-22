import { Client, CommandInteraction, Interaction, MessageFlags } from "discord.js"
import { Commands } from "../../src/commands"

export default (client: Client): void => {
    client.on("interactionCreate", async (interaction: Interaction) => {
        if (interaction.isCommand() || interaction.isContextMenuCommand()) {
            await handleSlashCommand(client, interaction)
        }
    })
}

const handleSlashCommand = async (client: Client, interaction: CommandInteraction): Promise<void> => {
    const slashCommand = Commands.find(command => command.name === interaction.commandName)

    if (!slashCommand) {
        interaction.reply({
            content: "An error has occured",
            flags: MessageFlags.Ephemeral
        })
        return
    }

    slashCommand.run(client, interaction)
}