import HabitCategorySelector from "../../components/HabitCategorySelector"
import HabitEditor from "../../components/HabitEditor"
import Layout from "../../components/Layout/Layout"
import MenuButton from "../../components/MenuButton"
import useHabits from "../../data/useHabits.hook"

export default function HabitOverview() {

    const { isLoading, habits } = useHabits()

    if (isLoading) return null

    return <div style={{
        height: "100vh",
        overflowY: "scroll",
        scrollSnapType: "y mandatory",
        scrollBehavior: "smooth",
    }}>
        <HabitCategorySelector habits={habits!} />
        <Layout>
            <HabitEditor />
        </Layout>
    </div >
}