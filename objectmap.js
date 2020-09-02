

Object.prototype.map = function(callback/*[key, value], idx, self*/) {
    console.log('hello')
    
    const reducer = function(acumulator, [key, value], idx, self) {
        console.log('hi this: ',this)
        
        Object.assign(acumulator, callback([key, value], idx, this))
        
        return acumulator
    }
    
    const result = Object.entries(this).reduce(reducer.bind(this) , {} )
    return result
}

const car = {
    brand: 'Ford',
    color: 'Black'
}


const callback = ([key, value], idx, self) => {
    console.log('this: ', this)
    console.log('key: ', key)
    console.log('value: ', value)
    console.log('idx: ',idx)
    console.log('self: ', self)
    console.log('callback result ', {key: value})
    return {[key]: value}
}


const wynik = car.map(callback)
console.log('wynik: ', wynik)




// jego działanie ma wyglądać tak
// const result = obj.map(([key, value], idx, self)=>{
//     if(value === 'value'){
//         return { [key]: value }
//     }

//     return {}
// })
