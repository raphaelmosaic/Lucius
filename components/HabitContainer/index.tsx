import Link from "next/link"
import HabitCard from "../HabitCard"
import style from "./habitContainer.module.css"

export interface HabitContainerProps {

    habitCategory: string

    habits: string[]
}
export default function HabitContainer({ habits, habitCategory }: HabitContainerProps) {

    return <div className={style["habitContainer"]}>

        {Object.entries(habits).map(([habitCategory, habit], idx) => <HabitCard
            habitCategory={habitCategory}
            habit={habit}
            key={idx}
        />)}
    </div>
}