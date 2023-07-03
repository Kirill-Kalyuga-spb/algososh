const swap = (arr: string[], i: number, l: number) => {
    return [arr[i], arr[l]] = [arr[l], arr[i]]
}

export const reversalString = (value: string) => {
    const array = value.split('').map((item: string) => {
        return item
    })
    
    const end = array.length - 1
    const middle = Math.ceil(array.length / 2) + 1

    for (let i = 0; i < middle - 1; i++) {
        let l = end - i
        swap(array, i, l)
    }

    return array
}