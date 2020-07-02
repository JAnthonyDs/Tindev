const Dev = require('../models/Dev')

module.exports ={
    async store(req,res){
        console.log(req.io, req.connectedUsers)

        const {user} = req.headers;
        const {devId} = req.params;

        const loggedDev = await Dev.findById(user)
        const targetDev = await Dev.findById(devId)

        if(!targetDev){
            return res.status(400).json({error: "dev not exist"})
        }

        if(targetDev.likes.includes(loggedDev._id)){ // Match
            const loggedSocket = req.connectedUsers[user]
            const targetSocket = req.connectedUsers[devId]

            if(loggedSocket){
                req.io.to(loggedSocket).emit('match', targetDev) //avisando ao usuario logado:que ele deu match em tal usuário
            }
            if(targetSocket){
                req.io.to(targetSocket).emit('match', loggedDev) //caminho inverso
            }
        }

        loggedDev.likes.push(targetDev._id);

        await loggedDev.save()

        return res.json(loggedDev)
    }
}