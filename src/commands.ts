import { Command } from "./command"
import { Ping } from "./commands/ping"
import { CheckReactions } from "./commands/check_reactions"

export const Commands: Command[] = [
    Ping,
    CheckReactions
]