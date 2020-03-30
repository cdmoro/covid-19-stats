
import { useEffect } from "react"

const useEvent = (type: string, callback: Function) => {
    useEffect(() => {
        // @ts-ignore
        window.addEventListener('resize', callback)

        // @ts-ignore
        return () => window.removeEventListener(type, callback)
    }, [type, callback])
}

export default useEvent