import { resolve } from "dns";

export const delay = ms => new Promise(
    (resolve, reject) =>
    {
        setTimeout(() =>
        {
            resolve()
        }, ms)
    })