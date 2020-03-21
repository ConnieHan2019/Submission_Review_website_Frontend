//Created by ZYR

// export function usernameValid(str) {

//   const reg = /[A-Za-z0-9_\-\u4e00-\u9fa5]+/

//   return reg.test(str)

// }
// export function passwordValid(str) {

//   const reg = /[A-Za-z0-9_\-\u4e00-\u9fa5]+/

//   return reg.test(str)

// }
// export function emailValid(str) {

//   const reg = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/

//   return reg.test(str)

// }
export function usernameValid (rule, value, callback) 
{  setTimeout(() => {    
    if (!/[A-Za-z0-9_\-\u4e00-\u9fa5]+/.test(value)) {      
        callback(new Error('Please input correct username'))    
    } else {      
        callback()   
    }  
}, 500)}
export function passwordValid (rule, value, callback) 
{  setTimeout(() => {    
    if (!/[A-Za-z0-9_\-\u4e00-\u9fa5]+/.test(value)) {      
        callback(new Error('Please input correct password'))    
    } else {      
        callback()   
    }  
}, 500)}
export function emailValid (rule, value, callback) 
{  setTimeout(() => {    
    if (!/\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/.test(value)) {      
        callback(new Error('Please input correct email'))    
    } else {      
        callback()   
    }  
}, 500)}
