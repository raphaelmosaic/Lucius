import { useQuery } from 'react-query'

type Habits = Record<string, string[]>

async function fetchHabits() {

    const res = await fetch("/habits.json")

    const data: Habits = await res.json()

    return data
}

export default function useHabits() {

    const { isLoading, isError, data, error } = useQuery("habits", fetchHabits)

    return { isLoading, isError, habits: data, habitError: error }
}