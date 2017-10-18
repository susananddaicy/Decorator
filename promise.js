const p1 = new Promise((resolve,reject) => {
  console.log(1);
  reject();
});
console.log(2);
p1.then(()=>{
  console.log(3);
},()=>{
  console.log(5);
});
console.log(4);
// 1 
// 2
// 4
// 5