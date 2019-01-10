
function swap(arr, x, y) {
  if (y > arr.length) {
    y = arr.length;
  }
  const temp = arr[x];
  arr[x] = arr[y];
  arr[y] = temp;
  return arr;
}


// I will choose the first element as pivot to do the pivot point 
function quickSort(arr, start = 0, end) {
  // base case 
  if (end === undefined ) {
    end = arr.length;
  }
  console.log(`start: ${start}, end: ${end}`);
  if (end - start <= 1) {
    return
  }
  const pivotValue = arr[start]; // include start
  let left = start + 1; // don't include start as it is pivot
  let right = end - 1; // don't include end
  while (left !== right) {
    console.log(`left: ${left}, right: ${right}`);
    if (arr[left] > pivotValue) {
      swap(arr, left, right);
      right -= 1;
    } else {
      left += 1;
    }
    console.log(arr, left, right);
  }
  if (arr[left] > pivotValue) {
    left -= 1;
  } 
  swap(arr, start, left);
  console.log(arr, `pivot index: ${left}`);
  // left
  quickSort(arr, start, left);
  // right 
  quickSort(arr, left + 1, end);

}

// check left if greater then pivot
// if yes swap and move check right 


const test = [5, 2, 8, 8, 4, 1, 9, 1];

quickSort(test);
console.log(test);

module.exports = {
  quickSort,
}