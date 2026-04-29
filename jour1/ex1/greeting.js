function greets(name){
    return "Bonjour, " + name + " !" 
}
console.log(greets("Mattis"));

module.exports.greets = greets; 