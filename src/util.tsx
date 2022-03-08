
export function removeItem(arr: object[], item: string) {
    arr.forEach((element, i) =>{
        if(Object.values(element).includes(item)) {
            arr.splice(i,1)
        }
    })
    return arr
}