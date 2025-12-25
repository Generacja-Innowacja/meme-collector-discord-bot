import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from "discord.js"
import { Command } from "../command"
import { ScoreEntry, EmojiObject } from "./../index"
import fs from "fs"

export const CheckReactions: Command = {
    data: new SlashCommandBuilder()
        .setName("check_reactions")
        .setDescription("Sprawdź ile reakcji zebrałeś/aś pod swoimi memami")
        .addStringOption(option => 
            option
                .setName("type")
                .setDescription("Jaki zakres reakcji chcesz dostać")
                .setChoices(
                    { name: "Tydzień", value: "weekly" },
                    { name: "Miesiąc", value: "monthly" },
                    { name: "Rok", value: "yearly" }
                )
                .setRequired(false)
        ),

    async execute(interaction: ChatInputCommandInteraction) {
        type ScoreType = "weekly" | "monthly" | "yearly"
        const score_type: ScoreType = (interaction.options.getString("type", false) as ScoreType) ?? "weekly"
        const scores: ScoreEntry[] = JSON.parse(fs.readFileSync("src/logs/memes.json", "utf-8"))
        const entry: ScoreEntry | undefined = scores.find(e => e.id === interaction.user.id)

        const embed = new EmbedBuilder()
            .setColor("#ff6432")

        switch (score_type) {
            case "weekly":
                embed.setTitle("Twoje reakcje z tego tygodnia:")
                break
            case "monthly":
                embed.setTitle("Twoje reakcje z tego miesiąca:")
                break
            case "yearly":
                embed.setTitle("Twoje reakcje z tego roku:")
                break
        }

        if (entry && entry.reactions[score_type].length > 0) {
            let description: string = ""
            entry.reactions[score_type].forEach((reaction: EmojiObject, index: number) => {
                description += `**${reaction.name}: x${reaction.count}**`
                if (index + 1 < entry.reactions[score_type].length) description += "\n"
            })
            embed.setDescription(description)
        } else {
            embed.setDescription("Brak! Zacznij wrzucać memy i rozkręcać serwer zamiast tylko dawania serduszek!")
        }

        embed.setThumbnail(interaction.user.displayAvatarURL())

        await interaction.reply({ embeds: [embed]})
    }
}