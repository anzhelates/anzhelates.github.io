let arr = [1, 6, 2, 4, 3, 5];
let n = arr.length;

function bubbleSort(arr) {
    for (let i = 0; i < n - 1; i++) {
        let swapped = false;
        for (let j = 1; j < n - i; j++) {
            if (arr[j - 1] > arr[j]) {
                [arr[j - 1], arr[j]] = [arr[j], arr[j - 1]];
                swapped = true;
            }
        }
        if (!swapped) break;
    }
    return arr;
}

console.log(bubbleSort(arr));
