import { Client } from "discord.js"
import "dotenv/config"

import ready from "./events/clientReady"
import interactionCreate from "./events/interactionCreate"

const client = new Client({
    intents: [
        "MessageContent",
        "GuildMessages",
        "GuildMessageReactions",
        "DirectMessages",
        "DirectMessageReactions"
    ]
})

ready(client)
interactionCreate(client)

client.login(process.env.TOKEN)