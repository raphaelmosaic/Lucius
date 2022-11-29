import { useEffect, useRef, useState } from "react"
import { MultiSelect } from "react-multi-select-component"
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

        setSelected([{ label: newHabitCategory, value: newHabitCategory }])

    }, [habits])

    useEffect(() => {

        if (habits == null || habitCategory == null || textArea.current == null) return

        const isNewCategory = !(habitCategory in habits)

        const newContent = isNewCategory ? "" : markdownHabits[habitCategory]

        if (isNewCategory) submitHabits()

        textArea.current.value = newContent

        setHabitContent(newContent)

    }, [habits, habitCategory])

    const textArea = useRef<HTMLTextAreaElement>(null)

    const [selected, setSelected] = useState<{ label: string, value: string }[]>([]);

    if (isLoading) return null

    function setSelectedDings(e: { label: string, value: string }[]) {

        setSelected(prev => {

            const dinger = e.filter(i => !prev.includes(i))

            if (dinger.length === 0) return prev

            setHabitCategory((dinger[0] ?? e).label)

            return dinger
        })
    }

    const options = Object.keys(habits!).map(i => ({ label: i, value: i }))

    return <div className={style["habitEditor"]}>

        {/* <select
            onChange={e => setHabitCategory(e.target.value)}
            className={style["habitCategoryField"]}
        >
            {Object.keys(habits!).map((i, idx) => <option value={i} key={idx}>{i}</option>)}
        </select> */}

        <MultiSelect
            className={style["dings"]}
            options={options}
            value={selected}
            onChange={setSelectedDings}
            labelledBy="Select"
            isCreatable={true}
            hasSelectAll={false}
            closeOnChangedValue={true}
            ItemRenderer={({ checked, option, onClick }: any) =>

                <div onClick={onClick}>{option.label}</div>
            }
        />

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