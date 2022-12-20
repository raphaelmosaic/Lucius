import { useEffect, useRef } from "react"

export default function useFocusOnMount<T extends HTMLElement>() {

    const focusOnMount = useRef<T>(null)

    useEffect(() => {

        // TODO: find a better method than setting a timeout of 100ms
        const DELAY_MS = 100

        setTimeout(() => {

            if (focusOnMount.current == null) return

            focusOnMount.current.focus()
        }, DELAY_MS)
    }, [])

    return {
        focusOnMount
    }
}