export const shallowEqual = (a, b) => {
    const aKeys = Object.keys(a)
    const bKeys = Object.keys(b)

    if (aKeys.length !== bKeys.length) {
        return false
    }

    return aKeys.every(key => a[key] === b[key])
}
