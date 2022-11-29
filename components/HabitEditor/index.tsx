import { useEffect, useRef, useState } from "react"
import useHabits from "../../data/useHabits.hook"
import style from "./habitEditor.module.css"

export interface HabitEditorProps { }
export default function HabitEditor({ }: HabitEditorProps) {

    const { isLoading, habits, updateHabits } = useHabits()

    const [habitCategory, setHabitCategory] = useState<string | null>(null)

    const [habitContent, setHabitContent] = useState<string>("")

    const markdownHabits = Object.fromEntries(Object.entries(habits!).map(([key, value]) => [key, "- " + value.join("\n- ")]))

    function submitHabits() {

        const newHabits = {
            ...markdownHabits,
            [habitCategory!]: habitContent,
        }
        updateHabits(newHabits)
    }
    useEffect(() => {

        if (habits == null) return

        const newHabitCategory = Object.keys(habits!)[0]

        setHabitCategory(newHabitCategory)

    }, [habits])

    useEffect(() => {

        if (habits == null || habitCategory == null || !(habitCategory in habits) || textArea.current == null) return

        const newContent = markdownHabits[habitCategory]

        textArea.current.value = newContent

        setHabitContent(newContent)

    }, [habits, habitCategory])

    const textArea = useRef<HTMLTextAreaElement>(null)

    if (isLoading) return <h2>loading...</h2>

    return <div className={style["habitEditor"]}>

        <select
            onChange={e => setHabitCategory(e.target.value)}
            className={style["habitCategoryField"]}
        >
            {Object.keys(habits!).map(i => <option value={i}>{i}</option>)}
        </select>

        <textarea
            ref={textArea}
            placeholder="Habits" className={style["habitContentField"]}
            onChange={e => setHabitContent(e.target.value)}
        />

        <button
            onClick={submitHabits}
            className={style["habitUpdateButton"]}
        >
            Update
        </button>
    </div>
}