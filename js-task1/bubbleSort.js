let arr = [1, 2, 3, 4, 5, 6];
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
