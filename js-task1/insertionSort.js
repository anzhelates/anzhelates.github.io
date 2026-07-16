let arr = [1, 6, 2, 4, 3, 5];
let n = arr.length;

function insertionSort(arr) {
    for (let i = 1; i < n; i++) {
        let j = i;
        while (j > 0 && arr[j - 1] > arr[j]) {
            [arr[j - 1], arr[j]] = [arr[j], arr[j - 1]];
            j--;
        }
    }
    return arr;
}

console.log(insertionSort(arr));
