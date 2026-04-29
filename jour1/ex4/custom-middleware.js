const myMiddleware = (req, res, next) => {
    console.log('La requete est arrivée sur le serveur');
    res.setHeader('X-Custom-Header', 'HelloWorld');
    next();
}
module.exports = myMiddleware;