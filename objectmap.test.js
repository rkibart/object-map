

Object.prototype.map = function(callback/*[key, value], idx, self*/) {

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

describe('Object.prototype.map function tests', () => {

    // it('Should throw an error when callback is not a function', () => {
    //     const car = {
    //         brand: 'Ford',
    //         color: 'Black'
    //     }

    //     const cb = 'string'

        
    //     expect(car.map(cb)).toThrowError(TypeError)
    // })

    it('Should return shalow copy of input object ', () => {
        const car = {
            brand: 'Ford',
            color: 'Black'
        }

        const cb = ([k,v]) => {
            return {[k]:v}
        }

        
        expect(car.map(cb).brand).toBe('Ford')
        expect(car.map(cb).color).toBe('Black')
        expect( Object.keys(car.map(cb)).length).toBe(2)
        expect( Object.is((car.map(cb)), car)).toBe(false)

        
        
    })

})





const car = {
    brand: 'Ford',
    color: 'Black'
}

const functionObject = {
    funkcja: function() {
        console.log('nic nierobiąca funkcja')
    }
}

const objektObiekcie = {
    name: 'Ala',
    auto: car,
    drugieAuto: {
        brand: 'Mazda',
        drugewDrugim: car
    }
}


const callback = ([key, value], idx, self) => {
    console.log('this: ', this)
    console.log('key: ', key)
    console.log('value: ', value)
    console.log('idx: ',idx)
    console.log('self: ', self)
    console.log('callback result ', {key: value})

    if(value === 'Ford') {
        newValue='Mazda'
        return {[key]: newValue}
    }
    return {[key]: value}
}

const callbackWithAllParams = ([k, v], i, s) => {
    k = k + i
    return {[k]:  v}
}

