import express from 'express';

import gameController from '../controller/gameController';


let router = express.Router();

let initWebRoutes = (app) => {

    //GAME
    router.get('/api/get-all-game', gameController.getAllNewGame)
    router.get('/api/get-top-game', gameController.getAllTopGame)
    router.get('/api/get-game-by-id', gameController.getGameById)
    router.post('/api/create-new-game', gameController.CreateNewGame)
    router.post('/api/create-new-account', gameController.CreateNewAccount)
    router.get('/api/get-allcode', gameController.getAllCodeService)
    router.get('/api/get-all-taggame', gameController.getAllTagGame)
    router.get('/api/get-all-topgame-18', gameController.getAllTopGame18)
    router.get('/api/login-into-system', gameController.LoginIntoSystem)
    router.get('/api/find-game-by-keyword', gameController.findGameByKeyWord)







    return app.use("/", router);
}

module.exports = initWebRoutes