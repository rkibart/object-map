

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

    const car = {
        brand: 'Ford',
        color: 'Black'
    }

    it('Should throw an error when callback is not a function', () => {
        const car = {
            brand: 'Ford',
            color: 'Black'
        }

        const cb = 'string'

        
        expect(car.map(cb)).toThrowError(TypeError)
    })

    it('Should return shalow copy of input object when callback rewrites pairs key value', () => {

        const cb = ([k,v]) => {
            return {[k]:v}
        }

        
        expect(car.map(cb).brand).toBe('Ford')
        expect(car.map(cb).color).toBe('Black')
        expect( Object.keys(car.map(cb)).length).toBe(2)
        expect( Object.is((car.map(cb)), car)).toBe(false)

        
        
    })
    it('Should change value if key matches', () => {

        const cb = ([k,v]) => {
            if(k==='color') {
                return {[k]: 'Blue'} 
            }
            return {[k]:v}
        }      
        expect(car.map(cb).brand).toBe('Ford')
        expect(car.map(cb).color).toBe('Blue')
        
    })
    it('Should change key if key matches', () => {

        const cb = ([k,v]) => {
            if(k==='color') {
                [k] = ['oldcolor']
                return {[k]: v} 
            }
            return {[k]:v}
        }      
        expect(car.map(cb).brand).toBe('Ford')
        expect(car.map(cb).oldcolor).toBe('Black')
        
    })
    it('Should change value if value matches', () => {
        const cb = ([k,v]) => {
            if(v==='Ford') {
                v = 'Mazda'
                return {[k]: v} 
            }
            return {[k]:v}
        }      
        expect(car.map(cb).brand).toBe('Mazda')
        expect(car.map(cb).color).toBe('Black')
        
    })
    it('Should return empty object if value and key do not match', () => {
        const cb = ([k,v]) => {
            if(v==='Fiat') {
                v = 'Mazda'
                return {[k]: v} 
            } else if (k === 'model') {
                [k] = 'oldmodel'
                return {[k]: v}
            }
            return {}
        }      
        expect( Object.keys(car.map(cb)).length).toBe(0)
        
    })

})



