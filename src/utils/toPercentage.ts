const toPercentage = (value: number = 0, total: number = 0): string => {
    const percentage: number = (value / total) * 100 || 0
    return `${percentage.toFixed(2)}%`;
}

export {
    toPercentage
}