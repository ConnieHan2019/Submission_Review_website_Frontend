//Created by ZYR
var username;
export function usernameValid (rule, value, callback) 
{     
    if (!/^([a-zA-Z]|\-)[A-Za-z0-9_\-]+/.test(value)) {      
        callback(new Error('Please input correct username'))    
    } else {      
        username = value;
        callback()   
    }  
}
export function passwordValid (rule, value, callback) 
{  
    if (!/(?!^(\d+|[a-zA-Z]+|\-+)$)^[\w\-]/.test(value)) {      
        callback(new Error('Please input correct password'))    
    } else if(username != undefined && value.indexOf(username) != -1){      
        callback(new Error("Password can not contain username"))   
    }  
    else{
        callback();
    }
}
export function emailValid (rule, value, callback) 
{    
    if (!/\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/.test(value)) {      
        callback(new Error('Please input correct email'))    
    } else {      
        callback()   
    }  
}
