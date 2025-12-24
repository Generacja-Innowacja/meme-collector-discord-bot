import fs from "fs"
import schedule from "node-schedule"

// Logging function
function log(level: string, message: string): void {
    const timestamp = new Date().toISOString()
    console.log(`[${timestamp}] [${level}]: ${message}`)
}

// Define a type for the emoji object
interface EmojiObject {
    id: string,
    name: string,
    count: number
}

// Define a type for the entry
interface ScoreEntry {
    id: string,
    username: string,
    reactions: {
        weekly: EmojiObject[],
        monthly: EmojiObject[],
        yearly: EmojiObject[]
    }
}



/*

    scheduleJob.spec syntax:

    *    *    *    *    *    *
    ┬    ┬    ┬    ┬    ┬    ┬
    │    │    │    │    │    │
    │    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
    │    │    │    │    └───── month (1 - 12)
    │    │    │    └────────── day of month (1 - 31)
    │    │    └─────────────── hour (0 - 23)
    │    └──────────────────── minute (0 - 59)
    └───────────────────────── second (0 - 59, OPTIONAL)

*/

// Weekly reset
schedule.scheduleJob("0 0 * * 1", () => { // every monday
    // Get the scores and the entry
    const scores: ScoreEntry[] = JSON.parse(fs.readFileSync("src/logs/memes.json", "utf-8"))

    // Reset the weekly scores
    for (const score of scores) {
        score.reactions.weekly = []
    }

    // Save scores to the memes.json file
    fs.writeFileSync("src/logs/memes.json", JSON.stringify(scores, null, 4))
    log("LOG", `Resetted weekly reaction scores.`)
})

// Monthly reset
schedule.scheduleJob("0 0 1 * *", () => { // every 1st of the month
    // Get the scores and the entry
    const scores: ScoreEntry[] = JSON.parse(fs.readFileSync("src/logs/memes.json", "utf-8"))

    // Reset the monthly scores
    for (const score of scores) {
        score.reactions.monthly = []
    }

    // Save scores to the memes.json file
    fs.writeFileSync("src/logs/memes.json", JSON.stringify(scores, null, 4))
    log("LOG", `Resetted monthly reaction scores.`)
})

// Yearly reset
schedule.scheduleJob("0 0 1 1 *", () => { // every Jan 1st
    // Get the scores and the entry
    const scores: ScoreEntry[] = JSON.parse(fs.readFileSync("src/logs/memes.json", "utf-8"))

    // Reset the yearly scores
    for (const score of scores) {
        score.reactions.yearly = []
    }

    // Save scores to the memes.json file
    fs.writeFileSync("src/logs/memes.json", JSON.stringify(scores, null, 4))
    log("LOG", `Resetted yearly reaction scores.`)
})