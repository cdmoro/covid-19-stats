import { useState, useEffect } from "react"

const useFetch = <T = undefined | any>(url: string, callback: Function = (data: any) => data): [T | undefined, boolean, string, Function] => {
    const [data, setData] = useState<T>()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)

    async function fetchData() {
        setLoading(true)
        setError('')
        try {
            const r = await fetch(url)
            const data = await r.json()

            if (data.error)
                setError(data.error.message)
            else
                setData(callback(data))
        } catch (error) {
            setError('Bad request')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url])
    
    return [
        data,
        loading,
        error,
        fetchData
    ]
}

export default useFetch