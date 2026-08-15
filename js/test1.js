const numbers = [1.1,2.2,3.5,4.8];

let n1,n2,n3,n4 ;
n1= numbers[0] ;
n2= numbers[1] ;
n3= numbers[2] ;
n4= numbers[3] ;
let Q1=[n1] , Q2=[n1,n2] , Q3=[n1,n2,n3], Q4=[n1,n2,n3,n4] ;

function sum(Quarter) {
  let total=Quarter.reduce((accumulator, currentValue) => (accumulator + currentValue)) 
  return total 
}

// let total =  ;
console.log(sum(Q4));


let arr = [1, 2, 3, 4, 5];
let reversedArr = [...arr].reverse(); // or arr.slice().reverse()
console.log(reversedArr); // Output: [5, 4, 3, 2, 1]
console.log(arr);