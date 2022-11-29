import HabitCard from "../HabitCard"
import style from "./habitContainer.module.css"

export interface HabitContainerProps {

    habitCategory: string

    habits: string[]
}
export default function HabitContainer({ habits, habitCategory }: HabitContainerProps) {

    return <div className={style["slider-container"]}>

        {Object.entries(habits).map(([habitCategory, habit]) => <HabitCard
            habitCategory={habitCategory}
            habit={habit}
        />)}

    </div>
}