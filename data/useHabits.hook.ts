import { useMutation, useQuery } from 'react-query'

type Habits = Record<string, string[]>

async function fetchHabits() {

    const res = await fetch("/api/habits")

    const data: Habits = await res.json()

    return data
}
async function updateHabits(habits: any) {

    const res = await fetch("/api/habits", { method: "PUT", body: JSON.stringify(habits) })
}

export default function useHabits() {

    const { isLoading, isError, data, error } = useQuery("habits", fetchHabits)

    const updateHabitsMutation = useMutation({
        mutationFn: updateHabits
    })

    return {
        isLoading,
        isError,
        habits: data,
        habitError: error,
        updateHabits: updateHabitsMutation.mutate,
    }
}