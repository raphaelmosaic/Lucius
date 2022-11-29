import { promises } from "fs"
import { join } from "path"

import type { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect';
import path from "path";

const HABITS_PATH = join(__dirname, "../../../../public/habits.json")

const handler = nc()

handler.get(async (req: NextApiRequest, res: NextApiResponse<Record<string, string[]>>) => {

    const data = (await promises.readFile(HABITS_PATH)).toString()

    const habits = JSON.parse(data)

    res.status(200).json(habits)
})
handler.put(async (req: NextApiRequest, res: NextApiResponse) => {

    const markdownHabits: Record<string, string> = JSON.parse(req.body)

    console.log("markdownHabits:", markdownHabits)

    const jsonHabits = Object.fromEntries(Object.entries(markdownHabits).map(([habitCategory, habitStr]) => ([habitCategory, habitStr.slice(2).split("\n- ")])))

    await promises.writeFile(HABITS_PATH, JSON.stringify(jsonHabits, null, 2));

    res.status(200)
})
export default handler