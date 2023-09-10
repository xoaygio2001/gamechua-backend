const db = require('../models');
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

let getAllNewGame = (limit) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!limit) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            }
            else {
                let data = await db.Game.findAll({
                    include: [
                        {
                            model: db.TagGame,
                            include: [
                                { model: db.AllCode }
                            ]
                        }
                    ],
                    order: [
                        ['updatedAt', 'DESC'],
                    ],
                    raw: true,
                    nest: true
                })

                if (!data || data.length < 1) { data = [] }
                else {
                    data.map((item) => {
                        if (item.img) {
                            item.img = new Buffer(item.img, 'base64').toString('binary');
                            return item;
                        }
                    })
                }

                resolve({
                    errMessage: 'ok',
                    errCode: 0,
                    data
                })
            }
        } catch (e) {
            reject(e);

        }
    })
}

let getAllTopGame = (limit, type) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!limit, !type) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            }
            else {
                let orderByType = [];

                switch (type) {
                    case 'NEW':
                        orderByType = ['updatedAt', 'DESC'];
                        break;

                    case 'HOT':
                        orderByType = ['point', 'DESC'];
                        break;

                    case 'OUTSTANDING':
                        orderByType = ['point', 'DESC'];
                        break;

                    default:
                        orderByType = ['updatedAt', 'DESC'];
                        break;
                }



                let fake = await db.Game.findAll({
                    include: [
                        {
                            model: db.TagGame,
                            include: [
                                { model: db.AllCode }
                            ]
                        }
                    ],
                    order: [
                        orderByType,
                    ],

                    raw: true,
                    nest: true
                })

                let resultMap = new Map();

                fake.forEach(item => {
                    const id = item.id;

                    if (!resultMap.has(id)) {
                        resultMap.set(id, {
                            id: item.id,
                            name: item.name,
                            img: item.img,
                            url: item.url,
                            contentMarkdown: item.contentMarkdown,
                            contentHTML: item.contentHTML,
                            capacity: item.capacity,
                            partNumber: item.partNumber,
                            ram: item.ram,
                            playerNumber: item.playerNumber,
                            language: item.language,
                            win: item.win,
                            playWith: item.playWith,
                            seri: item.seri,
                            point: item.point,
                            createdAt: item.createdAt,
                            updatedAt: item.updatedAt,
                            TagGames: [item.TagGames],
                        });
                    } else {


                        resultMap.get(id).TagGames.push(item.TagGames);


                    }
                });

                let data = Array.from(resultMap.values());



                if (!data || data.length < 1) { data = [] }
                else {
                    data.map((item) => {
                        if (item.img) {
                            item.img = new Buffer(item.img, 'base64').toString('binary');
                            return item;
                        }
                    })
                }

                resolve({
                    errMessage: 'ok',
                    errCode: 0,
                    data
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

let getAllTopGame18 = (limit) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!limit) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            }
            else {

                let orderByType = ['updatedAt', 'DESC'];


                const gamesWithC3Tag = await db.Game.findAll({
                    attributes: ['id'],
                    include: [
                        {
                            model: db.TagGame,
                            where: { tagId: 'C3' },
                        },
                    ],
                    raw: true,
                    nest: true,
                });

                const gameIds = gamesWithC3Tag.map(game => game.id);

                const fake = await db.Game.findAll({
                    include: [
                        {
                            model: db.TagGame,
                            where: { gameId: gameIds },
                            include: [
                                { model: db.AllCode }
                            ]

                        },
                    ],
                    order: [
                        orderByType,
                    ],

                    raw: true,
                    nest: true,
                });

                // let a = [
                //     {
                //         id: 3,
                //         name: 'abc',
                //         img: 'aaaa',
                //         TagGames: { tagId: 'C3', gameId: 1, AllCode: {} },
                //     },
                //     {
                //         id: 3,
                //         name: 'abc',
                //         img: 'aaaa',
                //         TagGames: { tagId: 'C2', gameId: 1, AllCode: {} },
                //     },
                //     {
                //         id: 9,
                //         name: 'abfsdc',
                //         img: 'fdsfs',
                //         TagGames: { tagId: 'C3', gameId: 2, AllCode: {} },
                //     },
                // ];

                let resultMap = new Map();

                fake.forEach(item => {
                    const id = item.id;

                    if (!resultMap.has(id)) {
                        resultMap.set(id, {
                            id: item.id,
                            name: item.name,
                            img: item.img,
                            url: item.url,
                            contentMarkdown: item.contentMarkdown,
                            contentHTML: item.contentHTML,
                            capacity: item.capacity,
                            partNumber: item.partNumber,
                            ram: item.ram,
                            playerNumber: item.playerNumber,
                            language: item.language,
                            win: item.win,
                            playWith: item.playWith,
                            seri: item.seri,
                            point: item.point,
                            createdAt: item.createdAt,
                            updatedAt: item.updatedAt,
                            TagGames: [item.TagGames],
                        });
                    } else {
                        resultMap.get(id).TagGames.push(item.TagGames);
                    }
                });

                let data = Array.from(resultMap.values());

                if (data && data.length > 0) {

                    if (!data || data.length < 1) { data = [] }
                    else {
                        data.map((item) => {
                            if (item.img) {
                                item.img = new Buffer(item.img, 'base64').toString('binary');
                                return item;
                            }
                        })
                    }

                    resolve({
                        errMessage: 'ok',
                        errCode: 0,
                        data
                    })

                }

            }
        } catch (e) {
            reject(e);
        }
    })
}


let CreateNewGame = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (
                !data.name ||
                !data.img ||
                !data.url ||
                !data.contentMarkdown ||
                !data.contentHTML ||
                !data.capacity ||
                !data.partNumber ||
                !data.ram ||
                !data.playerNumber ||
                !data.language ||
                !data.win ||
                !data.playWith ||
                !data.seri ||
                !data.tags
            ) {

                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            }

            else {

                const jane = await db.Game.create({
                    name: data.name,
                    img: data.img,
                    url: data.url,
                    contentMarkdown: data.contentMarkdown,
                    contentHTML: data.contentHTML,
                    capacity: data.capacity,
                    partNumber: data.partNumber,
                    ram: data.ram,
                    playerNumber: data.playerNumber,
                    language: data.language,
                    win: data.win,
                    language: data.language,
                    playWith: data.playWith,
                    seri: data.seri,
                });

                let gameId = jane.toJSON().id

                const tag = [];

                data.tags.map((item, index) => {
                    tag[index] = {};
                    tag[index].tagId = item
                    tag[index].gameId = gameId
                })

                await db.TagGame.bulkCreate(tag)

                resolve({
                    errCode: 0,
                    message: 'Oke'
                })
            }

        }
        catch (expcept) {
            reject(expcept);
        }
    })
}

let CreateNewAccount = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (
                !data.username ||
                !data.password ||
                !data.roleId
            ) {

                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            }

            else {

                let account = await db.User.findOne({ where: { username: data.username } });

                if (account) {
                    resolve({
                        errCode: 2,
                        errMessage: 'Tài khoản đã tồn tại'
                    })
                } else {
                    const jane = await db.User.create({
                        username: data.username,
                        password: data.password,
                        roleId: data.roleId
                    });

                    resolve({
                        errCode: 0,
                        message: 'Oke'
                    })
                }


            }

        }
        catch (expcept) {
            reject(expcept);
        }
    })
}

let getGameById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            }
            else {
                let data = await db.Game.findOne({
                    where: { id: id },
                    include: [
                        // {
                        //     model: db.TagGame,
                        //     include: [
                        //         { model: db.AllCode }
                        //     ]
                        // },
                        {
                            model: db.AllCode, as: 'languageData'
                        },
                        {
                            model: db.AllCode, as: 'winData'
                        },
                        {
                            model: db.AllCode, as: 'playWithData'
                        }

                    ],
                    raw: true,
                    nest: true
                })


                if (!data) { data = {} }
                else {
                    let dataFake = await getTagGameByGameId(data.id)
                    if (dataFake && dataFake.data && dataFake.data.length > 0) {
                        data.TagGames = [];
                        data.TagGames = dataFake.data
                    }

                    data.img = new Buffer(data.img, 'base64').toString('binary');
                }

                resolve({
                    errMessage: 'ok',
                    errCode: 0,
                    data
                })
            }
        } catch (e) {
            reject(e);

        }
    })
}

let LoginIntoSystem = (username, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!username, !password) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            }
            else {
                let data = await db.User.findOne({
                    where: { username: username, password: password },
                    raw: true,
                    nest: true
                })


                if (!data) {
                    resolve({
                        errMessage: 'Thông tin tài khoản hoặc mật khẩu không chính xác',
                        errCode: 1,
                        data: {}
                    })
                }
                else {
                    resolve({
                        errMessage: 'ok',
                        errCode: 0,
                        data
                    })
                }

            }
        } catch (e) {
            reject(e);

        }
    })
}

let getTagGameByGameId = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            }
            else {
                let data = await db.TagGame.findAll({
                    where: { gameId: id },
                    include: [
                        { model: db.AllCode }
                    ],
                    raw: true,
                    nest: true
                })

                // if (!data) { data = {} }
                // else {
                //     data.img = new Buffer(data.img, 'base64').toString('binary');
                // }

                resolve({
                    errMessage: 'ok',
                    errCode: 0,
                    data
                })
            }
        } catch (e) {
            reject(e);

        }
    })
}

let getAllCodeService = (typeInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!typeInput) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters'
                });
            }
            else {
                let data = await db.AllCode.findAll({
                    where: { type: typeInput }
                });

                if (!data) { data = [] }

                resolve({
                    errMessage: 'ok',
                    errCode: 0,
                    data
                })

            }
        }
        catch (e) {
            reject(e);
        }
    })
}

let findGameByKeyWord = (keyWord) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!keyWord) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters'
                });
            }
            else {
                let data = await db.Game.findAll({
                    attributes: ['id','name', 'img'],
                    where: {
                        name: { [Op.like]: `%${keyWord}%` }
                    },
                    raw: true,
                    nest: true
                });

                if (!data || data.length < 1) { data = [] }
                else {
                    data.map((item) => {
                        if (item.img) {
                            item.img = new Buffer(item.img, 'base64').toString('binary');
                            return item;
                        }
                    })
                }

                resolve({
                    errMessage: 'ok',
                    errCode: 0,
                    data
                })

            }
        }
        catch (e) {
            reject(e);
        }
    })
}

let getAllTagGame = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.AllCode.findAll({
                where: [{ type: 'CATEGORY' }]
            });

            if (!data) { data = [] }

            resolve({
                errMessage: 'ok',
                errCode: 0,
                data
            })

        }
        catch (e) {
            reject(e);
        }
    })
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