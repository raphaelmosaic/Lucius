import { useRef, useState, useEffect } from "react";

import useIsInViewport from "../../utils/useIsInViewport";

export interface HabitCardProps {

    habit: string
    habitCategory: string
}
const HabitCard = ({ habit, habitCategory }: HabitCardProps) => {

    const card = useRef<HTMLDivElement>(null)

    const isInViewport = useIsInViewport(card);

    return (
        <div className="slider-children" ref={card}>
            <h2>{habit}</h2>
        </div>
    );
};

export default HabitCard;