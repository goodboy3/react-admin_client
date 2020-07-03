/*
 * @Author: your name
 * @Date: 2020-07-01 23:49:33
 * @LastEditTime: 2020-07-03 19:01:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \react-admin_client\src\utils\LoggerHelper.ts
 */
import "source-map-support/register";
import path from "path";
import moment from "moment";
export class LogHelper {
    
    static Init() {
        
        let log = console.log;
        console.log = function (message: any, ...args: any[]) {
            if (process.env.NODE_ENV === "production") {
                return;
            }
            let stackInfoStr = LogHelper.stackInfo();
            let info = `%c[${moment().format("YYYY-MM-DD HH:mm:ss.SSS")}][log][${stackInfoStr.file}:${stackInfoStr.line} (${stackInfoStr.method})] %c`;
            log(info, "color: #48d1cc", "color: white", message, ...args);
        };

        let loginfo = console.info;
        console.info = function (message: any, ...args: any[]) {
            if (process.env.NODE_ENV === "production") {
                return;
            }
            let stackInfoStr = LogHelper.stackInfo();
            let info = `%c[${moment().format("YYYY-MM-DD HH:mm:ss.SSS")}][info][${stackInfoStr.file}:${stackInfoStr.line} (${stackInfoStr.method})] %c`;
            loginfo(info, "color: #3ebe3e", "color: white", message, ...args);
        };

        let warn = console.warn;
        console.warn = function (message: any, ...args: any[]) {
            if (process.env.NODE_ENV === "production") {
                return;
            }
            let stackInfoStr = LogHelper.stackInfo();
            let info = `%c[${moment().format("YYYY-MM-DD HH:mm:ss.SSS")}][warn][${stackInfoStr.file}:${stackInfoStr.line} (${stackInfoStr.method})] %c`;
            warn(info, "color: #dbd172", "color: #dbd172", message, ...args);
        };

        let error = console.error;
        console.error = function (message: any, ...args: any[]) {
            if (process.env.NODE_ENV === "production") {
                return;
            }
            let stackInfoStr = LogHelper.stackInfo();
            let info = `[${moment().format("YYYY-MM-DD HH:mm:ss.SSS")}][error][${stackInfoStr.file}:${stackInfoStr.line} (${stackInfoStr.method})] `;
            error(info, message, ...args);
        };
    }

    

    static stackInfo(num: number = 0) {
        var stackReg = /at\s+(.*)\s+\((.*):(\d*):(\d*)\)/i;
        var stackReg2 = /at\s+()(.*):(\d*):(\d*)/i;
        var stacklist = new Error().stack.split("\n").slice(3);
        var s = stacklist[num];
        var sp = stackReg.exec(s) || stackReg2.exec(s);
        var data: any = {};
        if (sp && sp.length === 5) {
            data.method = sp[1];
            data.path = sp[2];
            data.line = sp[3];
            data.pos = sp[4];
            data.file = path.basename(data.path);
        }
        return data;
    }
}
