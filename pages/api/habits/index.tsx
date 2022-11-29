import { tmpdir } from "os"

import { promises, existsSync } from "fs"
import { join } from "path"

import type { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect';

const HABITS_PATH = join(tmpdir(), "habits.json")

const handler = nc()

handler.get(async (req: NextApiRequest, res: NextApiResponse<Record<string, string[]>>) => {

    if (!existsSync(HABITS_PATH)) {

        const exists = existsSync("/var/task/public/")

        res.json({ path: [exists ? "exists" : "does not"] })

        return

        await promises.writeFile(HABITS_PATH, `{ "morning": [ "mir dick einen runterholen" ] }`, { flag: "wx" },)
    }
    const data = (await promises.readFile(HABITS_PATH)).toString()

    const habits = JSON.parse(data)

    res.status(200).json(habits)
})
handler.put(async (req: NextApiRequest, res: NextApiResponse) => {

    const markdownHabits: Record<string, string> = JSON.parse(req.body)

    const jsonHabits = Object.fromEntries(Object.entries(markdownHabits).map(([habitCategory, habitStr]) => ([habitCategory, habitStr.slice(2).split("\n- ")])))

    await promises.writeFile(HABITS_PATH, JSON.stringify(jsonHabits, null, 2));

    res.status(200)
})
export default handler