let arr = [1, 6, 2, 4, 3, 5];
let n = arr.length;

function selectionSort(arr) {
    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        [arr[minIndex], arr[i]] = [arr[i], arr[minIndex]];
    }
    return arr;
}

console.log(selectionSort(arr));
