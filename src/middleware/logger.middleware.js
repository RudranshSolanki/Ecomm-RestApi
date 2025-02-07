import fs from 'fs';
import winston from 'winston';

const fsPromise = fs.promises;

//nonrmal logger
// async function log(logData){
//     try{
//         logData = ` \n ${new Date().toString()} - ${logData}`;
//         await fsPromise.appendFile('log.txt',logData);
//     }
//     catch(err)
//     {
//         console.log(err);
//     }
// }

//winston logger

const logger = winston.createLogger({
    level:'info',
    format: winston.format.json(),
    transports:[
        new winston.transports.File({filename:'logs.txt'})
    ]
});

const loggerMiddleware = async (req,res,next)=>{
    const logData = `${req.url} -${JSON.stringify(req.body)}`
    logger.info(logData);
    next();
}

export default loggerMiddleware;