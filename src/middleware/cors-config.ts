import { CorsOptions } from "cors"
import { GLOBAL } from "config/global"
import { RESPONSE } from "constant"

const allowedOrigins = GLOBAL.ALLOWED_ORIGINS

export const corsConfig = {
    credentials: true,
    origin: (origin: string, callback: (err: Error | null, allow?: boolean) => void) => {
        if (allowedOrigins.indexOf(origin || '') !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error(RESPONSE.ERROR.CORS_NOT_ALLOWED))
        }
    }
} as CorsOptions

