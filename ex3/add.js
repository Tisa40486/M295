function add(num1, num2){
    let num1Parse =  parseFloat(num1)
    let num2Parse =  parseFloat(num2)

    let result = num1Parse + num2Parse

    console.log(num1Parse + "+"+ num2Parse + "="+ result)
}

module.exports = add;