// quick one line to find the smallest. But I need a step form as well
function findSmallest(arr) {
  return arr.reduce((prev, curr, index) => {
    if (curr < prev.value) {
      return { value: curr, index };
    }
    return prev;
  }, { value: arr[0], index: 0 });
}

// easier ways to write this more legible but let's have fun with reduce
function sort(arr) {
  let sortedArray = Array.from(arr); // this is only a shallow copy
  let i;
  for (i = sortedArray.length; i > 0; i -= 1) {
    // find smallest
    const smallest = findSmallest(sortedArray.slice(0, i));

    // slice out the smallest
    const front = sortedArray.slice(0, smallest.index);
    const back = sortedArray.slice(smallest.index + 1);
    
    // put it back together
    sortedArray = front.concat(back);

    // add the smallest value back
    sortedArray.push(smallest.value);
  }
  return sortedArray;
}

// step form must be a generator requiring standard for loop
function* findSmallestStep(arr) {
  let index = 0;
  const smallest = {
    value: arr[0],
    index: 0,
  };
  for (index = 0; index < arr.length; index += 1) {
    yield { currentIndex: index, smallest };
    if (arr[index] < smallest.value) {
      smallest.value = arr[index];
      smallest.index = index;
      yield { currentIndex: index, smallest };
    }
    if (index === arr.length - 1) {
      return { currentIndex: index, smallest };
    }
  }
}

function* sortStep(arr) {
  let sortedArray = Array.from(arr); // this is only a shallow copy
  let i;
  for (i = sortedArray.length; i > 0; i -= 1) {
    // find smallest
    const smallSearch = findSmallestStep(sortedArray.slice(0, i));
    let search;
    do {
      search = smallSearch.next();
      yield { search, array: { sortedArray, edit: false } };
    } while (!search.done);

    const { smallest } = search.value;
    // slice out the smallest
    const front = sortedArray.slice(0, smallest.index);
    const back = sortedArray.slice(smallest.index + 1);

    // put it back together
    sortedArray = front.concat(back);

    // add the smallest value back
    sortedArray.push(smallest.value);
    if (i === 1) {
      return { search, array: { sortedArray, edit: true } };
    }
    yield { search, array: { sortedArray, edit: true } };
  }
}


// const test = [5, 3, 2, 6];

// const testSmallest = findSmallestStep(test);
// let rsl;
// do {
//   rsl = testSmallest.next();
//   console.log(rsl);
// } while (!rsl.done)

// console.log(findSmallest(test))

// sort(test);

// const testSort = sortStep(test);
// do {
//   rsl = testSort.next();
//   console.log(rsl);
// } while (!rsl.done)


export default sortStep;
