import * as Sentry from "@sentry/nextjs";
// import pino from "pino";

// const isDevelopment = 'development';

// const pinoLogger = pino({
//   // 1. FIX: Set level to 'debug' so Logger.debug() actually works
//   level: isDevelopment ? 'debug' : 'info', 
//   transport: isDevelopment 
//     ? {
//         target: 'pino-pretty',
//         options: {
//           colorize: true,
//           translateTime: 'SYS:standard',
//           ignore: 'pid,hostname',
//         },
//       } 
//     : undefined, // Production should use standard JSON for performance
// });

export const Logger={

    log:(message,level="info",extra={})=>{

        // const pinoMethod = pinoLogger[level] ? level : 'info';
        // pinoLogger[pinoMethod](extra, message);
        if(level ==="error"){
            Sentry.captureException(message,{
                level:"error",
                extra:extra

            })
        }else{
            Sentry.captureMessage(message,{
                level:level,
                extra:extra
            })
        }
    },
    error:(message,err = null,extra={})=>{
        Logger.log(message,"error",{...extra,error:err})
    },

    info:(message,extra)=>{
        Logger.log(message,"info",extra)
    },

    warn:(message,extra)=>{
        Logger.log(message,"warning",extra)
    },
    debug:(message,extra)=>{
    
        Logger.log(message,"debug",extra)
    }

}