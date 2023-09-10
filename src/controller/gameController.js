import gameService from "../services/gameService";


let getAllNewGame = async (req, res) => {
    try {
        let infor = await gameService.getAllNewGame(req.query.limit);
        return res.status(200).json(
            infor
        )
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let getAllTopGame = async (req, res) => {
    try {
        let infor = await gameService.getAllTopGame(req.query.limit, req.query.type);
        return res.status(200).json(
            infor
        )
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}



let getGameById = async (req, res) => {
    try {
        let infor = await gameService.getGameById(req.query.id);
        return res.status(200).json(
            infor
        )
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}



let CreateNewGame = async (req, res) => {
    try {
        let infor = await gameService.CreateNewGame(req.body);
        return res.status(200).json(
            infor
        )
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let CreateNewAccount = async (req, res) => {
    try {
        let infor = await gameService.CreateNewAccount(req.body);
        return res.status(200).json(
            infor
        )
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let getAllCodeService = async (req, res) => {
    try {
        let infor = await gameService.getAllCodeService(req.query.type);
        return res.status(200).json(
            infor
        )
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let getAllTagGame = async (req, res) => {
    try {
        let infor = await gameService.getAllTagGame();
        return res.status(200).json(
            infor
        )
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}


let getAllTopGame18 = async (req, res) => {
    try {
        let infor = await gameService.getAllTopGame18(req.query.limit);
        return res.status(200).json(
            infor
        )
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let LoginIntoSystem = async (req, res) => {
    try {
        let infor = await gameService.LoginIntoSystem(req.query.username, req.query.password);
        return res.status(200).json(
            infor
        )
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let findGameByKeyWord = async (req, res) => {
    try {
        let infor = await gameService.findGameByKeyWord(req.query.keyword);
        return res.status(200).json(
            infor
        )
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}







module.exports = {
    getAllNewGame: getAllNewGame,
    CreateNewGame: CreateNewGame,
    getAllCodeService: getAllCodeService,
    getGameById: getGameById,
    getAllTopGame: getAllTopGame,
    getAllTagGame: getAllTagGame,
    getAllTopGame18: getAllTopGame18,
    CreateNewAccount: CreateNewAccount,
    LoginIntoSystem: LoginIntoSystem,
    findGameByKeyWord: findGameByKeyWord
}