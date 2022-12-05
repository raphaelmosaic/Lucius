import type { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect';

import { getJsonFromMarkdown } from "../../../data/markdownJsonParsing";

const handler = nc()

handler.get(async (req: NextApiRequest, res: NextApiResponse<Record<string, string[]>>) => {

    const habits = await getHabitsJson()

    res.status(200).json(habits)
})

async function getHabitsJson() {

    if (typeof process.env.HABIT_FILE_URL !== "string") {

        throw new Error(`expected a string for process.env.HABIT_FILE_URL, instead got '${process.env.HABIT_FILE_URL}'`)
    }

    const res = await fetch(process.env.HABIT_FILE_URL)

    if (!res.ok) {

        throw new Error(`failed to fetch habits from '${process.env.HABIT_FILE_URL}'`)
    }

    const data = await res.text()

    const habits = getJsonFromMarkdown(data)

    return habits
}