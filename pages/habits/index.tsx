import HabitCategorySelector from "../../components/HabitCategorySelector";
import HabitEditor from "../../components/HabitEditor";
import useHabits from "../../data/useHabits.hook";

export default function Page() {

    const { isLoading, habits } = useHabits()

    if (isLoading) return <h2>loading...</h2>

    return <div style={{
        height: "100vh",
        overflowY: "scroll",
        scrollSnapType: "y mandatory",
        scrollBehavior: "smooth",
    }}>
        <HabitCategorySelector habits={habits!} />
        <HabitEditor />
    </div>
}