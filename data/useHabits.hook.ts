import { useEffect, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'

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

    const { isLoading, isError, data, error, refetch } = useQuery("habits", fetchHabits)

    const queryClient = useQueryClient()

    const updateHabitsMutation = useMutation({
        mutationFn: updateHabits
    })

    // const [habits, setHabits] = useState<any>(data ?? {})

    // useEffect(() => {

    //     setHabits(data ?? {})

    // }, [data])

    return {
        isLoading,
        isError,
        habits: data,
        habitError: error,
        updateHabits: async (newHabits: any) => {

            updateHabitsMutation.mutate(newHabits);

            // setHabits(newHabits)

            // this does not work for some reason
            await queryClient.invalidateQueries({ queryKey: ["habits"] })
        },
    }
}