
let count = 0;
let swapCount = 0;
function swap(arr, x, y) {
  if (y > arr.length) {
    y = arr.length;
  }
  const temp = arr[x];
  arr[x] = arr[y];
  arr[y] = temp;
  swapCount += 1;
  return arr;
}


// I will choose the first element as pivot to do the pivot point 
function quickSort(arr, start = 0, end) {
  // base case 
  if (end === undefined ) {
    end = arr.length;
  }
  // console.log(`start: ${start}, end: ${end}`);
  if (end - start <= 1) {
    return
  }
  const pivotValue = arr[start]; // include start
  let left = start + 1; // don't include start as it is pivot
  let right = end - 1; // don't include end index
  while (left !== right) {
    count += 1;
    // console.log(`left: ${left}, right: ${right}`);
    if (arr[left] > pivotValue) {
      swap(arr, left, right);
      right -= 1;
    } else {
      left += 1;
    }
    // console.log(arr, left, right);
  }
  if (arr[left] > pivotValue) {
    left -= 1;
  } 
  // console.log(arr, `pivot index: ${left}`);
  swap(arr, start, left);
  // console.log(arr, `pivot index: ${left}`);

  // left
  quickSort(arr, start, left);
  // right 
  quickSort(arr, left + 1, end);

}

function quickSort2(arr, start = 0, end) {
  // base case 
  if (end === undefined ) {
    end = arr.length;
  }
  if (end - start <= 1) {
    return
  }
  const pivotValue = arr[start]; // include start
  let left = start + 1; // don't include start as it is pivot
  let right = end - 1; // don't include end index
  while (left <= right) {
    count += 1;
    while (arr[left] < pivotValue) {
      count += 1;
      left += 1;
    }
    while (arr[right] > pivotValue && right > start) {
      count += 1;
      right -= 1;
    }
    if (left <= right) {
      swap(arr, left, right);
      left += 1;
      right -= 1; 
    }
  }
  swap(arr, start, right);

  // left
  quickSort(arr, start, left);
  // right 
  quickSort(arr, left + 1, end);
  return arr;
}

// check left if greater then pivot
// if yes swap and move check right 


function* quickSortStep(array, start = 0, end) {
  // base case 
  if (end === undefined ) {
    end = array.length;
  }
  if (end - start <= 1) {
    return
  }
  let pivotIndex = 0;
  const pivotValue = array[start]; // include start
  let left = start + 1; // don't include start as it is pivot
  let right = end - 1; // don't include end index
  yield {array, left, right, pivotValue, pivotIndex};
  while (left !== right) {
    console.log(`left: ${left}, right: ${right}`);
    if (array[left] > pivotValue) {
      swap(array, left, right);
      right -= 1;
    } else {
      left += 1;
    }
    console.log(array, left, right);
  }
  if (array[left] > pivotValue) {
    left -= 1;
  } 
  console.log(array, `pivot index: ${left}`);
  swap(array, start, left);
  console.log(array, `pivot index: ${left}`);

  // left
  quickSort(array, start, left);
  // right 
  quickSort(array, left + 1, end);

}


const test = [5, 2, 8, 8, 4, 1, 9, 1, 14, 10, 13, 20, 3];

quickSort2(test);
console.log(test);
console.log(count, swapCount);

count = 0;
swapCount = 0;
const test1 = [5, 2, 8, 8, 4, 1, 9, 1, 14, 10, 13, 20, 3]
quickSort(test1);
console.log(test1);
console.log(count,swapCount );


module.exports = {
  quickSort,
}