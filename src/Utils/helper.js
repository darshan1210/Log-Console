export const range = (start, end) => {
    const length = end - start + 1
    return Array.from({ length }, (_, idx) => idx + start)
}

export const debounce = (callBack, delay = 500) => {
    let timeout
    return (...args) => {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            callBack(...args)
        }, delay)
    }
}
