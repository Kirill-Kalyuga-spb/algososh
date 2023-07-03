const swap = (arr: number[], i: number, l: number) => {
    return [arr[i], arr[l]] = [arr[l], arr[i]]
}

const choice = (name: string, arr: number[]) => {
    let {length} = arr
    for (let i = 0; i < length; i++) {

      for (let j = i; j < length; j++) {
        if (name === 'increase') {
          if (arr[i] > arr[j]) { swap(arr, i, j) }
        }
        if (name === 'decrease') {
          if (arr[i] < arr[j]) { swap(arr, i, j) }
        }
      }
    }
    return arr
  }

const bubble = (name: string, arr: number[]) => {
    let {length} = arr
    for (let i = 0; i < length; i++) {
        for (let j = 0; j < length - i - 1; j++) {
            if (name === 'increase') {
                if (arr[j] > arr[j + 1]) { swap(arr, j, j + 1) }
            }
            if (name === 'decrease') {
                if (arr[j] < arr[j + 1]) { swap(arr, j, j + 1) }
            }
        }
    }
    return arr
}

export const decrease = (value: string, arr: number[]) => {
    const type = 'decrease'

    if (value === 'choice') {
        return choice(type, arr)
    } else {
        return bubble(type, arr)
    }
}

export const increase = (value: string, arr: number[]) => {
    const type = 'increase'
    
    if (value === 'choice') {
        return choice(type, arr)
    } else {
        return bubble(type, arr)
    }
}