// var add=(a,b)=>{
//     return a+b; 
// }

// console.log(add(2,4));

// (function(){
//     console.log('Hello'); 
// })(); 

// // function  callback(){
// //     console.log('Successfully Executed'); 
// // }

// const addd=(a,b,callback)=>{
//     let result=a+b; 
//     console.log("Result "+result); 
//     callback(); 
// }


// //inline function.
// addd(2,4,()=> console.log('Successfully Executed'));

// let fs=require('fs'); 
// let os=require('os'); 

// let user=os.userInfo(); 
// console.log(user.username); 

//creating a file.
//filename,text you want to display,a callback.
//jitni baar run karoge utni bar message print hoga file me.
// fs.appendFile('greeting.txt','Hi'+user.username+'!\n',()=>{
//     console.log('File is created'); 
// }); 




// const notes=require('./notes.js'); 
// console.log('server'); 

// let _=require('lodash'); 
//_ is a convention for lodash but you can use any variable for declaration.

// let age=notes.age; 
// console.log(age); 

// console.log(notes.add(2,4)); 

// let arr=[1,2,1,2,1,2]; 

// console.log(_.uniq(arr)); 



//json to Object.
// const jsonString='{"name":"vinay","age":22,"hobbies":["Watching Reels"]}';
// const  jsonObject=JSON.parse(jsonString); 

// console.log(jsonObject.hobbies[0]); 



// object to json.
// const jsonObj={"name":"vinay","age":22,"hobbies":["Watching Reels"]};
// const jsonString=JSON.stringify(jsonObj); 

// console.log(jsonString); 