/**
 * we receive the habits from a markdown file defined in process.env.HABIT_FILE_URL
 * these then get transformed into JSON using this function at GET /api/habits
 */
export function getJsonFromMarkdown(markdown: string): Record<string, string[]> {

    const SQUARE_BRACKETS = /[\[\]]/g
    const MARKDOWN_SMALL_HEADING = /^## /g
    const MARKDOWN_BULLETPOINT = /^- /g

    const cleanedMarkdown = markdown.replace(SQUARE_BRACKETS, "")

    const lines = cleanedMarkdown.split("\n")

    let currentCategory: string;

    let habits: Record<string, string[]> = {}

    for (const line of lines) {

        if (MARKDOWN_SMALL_HEADING.test(line)) {

            currentCategory = line.replace(MARKDOWN_SMALL_HEADING, "")

            habits[currentCategory] = []
        }
        if (MARKDOWN_BULLETPOINT.test(line)) {

            const dings = line.replace(MARKDOWN_BULLETPOINT, "")

            habits[currentCategory!].push(dings)
        }
    }
    return habits
}

/**
 * unused
 */
export function getJsonFromEditableJson(editableJson: Record<string, string>): Record<string, string[]> {

    const pairs = Object
        .entries(editableJson)
        .map(([habitCategory, habitStr]) => ([habitCategory, habitStr.slice(2).split("\n- ")]))

    return Object.fromEntries(pairs)
}

/**
 * unused
 */
export function getEditableJsonFromJson(json: Record<string, string[]>): Record<string, string> {

    return Object.fromEntries(Object.entries(json).map(([key, value]) => [key, "- " + value.join("\n- ")]))
}