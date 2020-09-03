

Object.prototype.map = function map(callback/*[key, value], idx, self*/) {

    if( typeof callback !== "function") {
        throw new TypeError(`${callback} is not a function!`)
    }
    
    const reducer = function(acumulator, [key, value], idx, self) {
        
        Object.assign(acumulator, callback([key, value], idx, this))
        
        return acumulator
    }
    
    const result = Object.entries(this).reduce(reducer.bind(this) , {} )
    return result
}









// // Stwórz metodę high order function .map dla klasy Object w TS
// const obj = {test:'value', test2:'value2'}

// // która przyjmuję callback:
// const callback = ([key, value], idx, self)=>{
//     // który zwraca obiekt ze zmienionym dowolnie kluczem bądź wartością
//     return { [key]:value }
// }

// // jego działanie ma wyglądać tak
// const result = obj.map(([key, value], idx, self)=>{
//     if(value === 'value'){
//         return { [key]: value }
//     }

//     return {}
// })
// // i ten result będzie równy { test:'value' }


// Object.prototype.map = function(){
//     // wykorzystaj do tego metodę .reduce
//     // return ...
// }
