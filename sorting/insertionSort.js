function insertionSort(A) {
  var key, i, j = 1, arrayLength = A.length;
  while(j < arrayLength){
    key = A[j];
    i = j - 1;
    while( i >= 0 && A[i] > key){
      A[i + 1] = A[i];
      i = i - 1;
    }
    j++
    A[i + 1] = key;  
  }
  console.log(A);
}
