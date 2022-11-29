import { useRef, useState, useEffect } from "react";

import style from "./habitCard.module.css"

import useIsInViewport from "../../utils/useIsInViewport";

export interface HabitCardProps {

    habit: string
    habitCategory: string
}
const HabitCard = ({ habit, habitCategory }: HabitCardProps) => {

    const card = useRef<HTMLDivElement>(null)

    return (
        <div className={style.habitCard} ref={card}>
            <h2>{habit}</h2>
        </div>
    );
};

export default HabitCard;