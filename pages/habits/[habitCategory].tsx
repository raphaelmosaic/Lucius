import { useRouter } from "next/router"
import HabitContainer from "../../components/HabitContainer"
import useHabits from "../../data/useHabits.hook"

export default function Page() {

    const router = useRouter()

    const { habitCategory } = router.query

    const { isLoading, habits } = useHabits()

    if (isLoading) return <h2>loading...</h2>

    if (!(habitCategory as string in habits!)) return <h2>Error: not a valid habit category</h2>

    return <HabitContainer habits={habits![habitCategory as string]} habitCategory={habitCategory as string} />

}