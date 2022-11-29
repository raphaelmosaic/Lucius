import HabitCategorySelector from "../components/HabitCategorySelector";
import useHabits from "../data/useHabits.hook";

export default function Page() {

  const { isLoading, habits } = useHabits()

  if (isLoading) return <h2>loading...</h2>

  return <HabitCategorySelector habits={habits!} />
}