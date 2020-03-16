import { useState } from "react"

export const useLocalStorage = <T = undefined>(key: string, initialValue: unknown) => {
    const [_value, _setValue] = useState<T>(() => {
        try {
            const item = window.localStorage.getItem(key)
            return item ? JSON.parse(item) : initialValue
        } catch (error) {
            return initialValue
        }
    })
    
    const setValue = (value: T) => {
        try {
            _setValue(value)
            
            window.localStorage.setItem(
                key,
                JSON.stringify(value)
            )
        } catch (error) {
            
        }
    }

    return [
        _value,
        setValue
    ]
}