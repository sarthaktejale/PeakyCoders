import { ObjectId } from 'mongodb';

const stringCheck = (str) =>{
    if(!str) return 1
    if(typeof(str)!="string") return 1
    str = str.trim()
    if(!str)return 1
    return 0
}
const calcRate = (arr,rate = 0)=>{
    
    for(let i of arr){
        rate = rate + parseInt(i["rating"])
    }
    return rate/arr.length
}

 const stringArrCheck = (arr)=>{
    if(!arr) return 1
    if(!Array.isArray(arr))return 1
    if(arr.length<1) return 1
    for(let i of arr){
        if(stringCheck(i)) return 1
    }
    return 0
}

const webCheck =(website)=>{
    if(stringCheck(website)) return 1
    let temp = (website.split("."))
    if(temp[0]!="http://www" || temp[2]!="com") return 1
    temp[1] = temp[1].trim()
    if(temp[1].length<=5)return 1
    return 0
}



const dateCheck =(date)=>{
    stringCheck(date)
    
    date= date.split("/")
    date = date.map(x=>{
      return parseInt(x)
    })
    
    if(!(date[0]>0 && date[0]<13)) return 1
    
    if(!(date[1]>0 && date[1]<32))return 1
    
    if(!(date[2]<2025&&date[2]>1899))return 1
    
    return 0
}

const idCheck = (id)=>{
    
    if(stringCheck(id)) throw "invalid id"
    if(!ObjectId.isValid(id))throw "invalid id"
}



export {stringArrCheck,stringCheck,webCheck,dateCheck,idCheck,calcRate}