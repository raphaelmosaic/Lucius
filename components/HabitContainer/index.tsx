import Link from "next/link"
import { useEffect, useRef } from "react"
import useFocusOnMount from "../../hooks/useFocusOnMount.hook"
import HabitCard from "../HabitCard"
import style from "./habitContainer.module.css"

export interface HabitContainerProps {

    habitCategory: string

    habits: string[]
}
export default function HabitContainer({ habits, habitCategory }: HabitContainerProps) {

    const { focusOnMount } = useFocusOnMount<HTMLDivElement>()

    return <div className={style["habitContainer"]} ref={focusOnMount}>

        {Object.entries(habits).map(([habitCategory, habit], idx) => <HabitCard
            habitCategory={habitCategory}
            habit={habit}
            key={idx}
        />)}
    </div>
}