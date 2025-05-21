// Default signature genration algorithm is HS256 -> HMAC + SHA256
import crypto from "crypto"
import { JWT_HEADER } from "../common/constants"
import { JWTError } from "../errors/jwt";

export class JWT{
    static encode(payload: any, secretKey: string, expiration: number){
        const headerJsonString = JSON.stringify(JWT_HEADER);
        const base64EncodedHeader = Buffer.from(headerJsonString).toString('base64url');

        // Add exp claim to payload
        payload.exp = Date.now() + expiration

        const payloadJsonString = JSON.stringify(payload);
        const base64EncodedPayload = Buffer.from(payloadJsonString, 'utf-8').toString('base64url');

        let token = `${base64EncodedHeader}.${base64EncodedPayload}`

        // generate signature
        const signature = crypto.createHmac('sha256', secretKey).update(token).digest('base64url')

        token += `.${signature}`

        return token;
    }

    static decode(token: string, secretKey: string){
        const [encodedHeader, encodePayload, signature] = token.split('.')

        const payloadJsonString = Buffer.from(encodePayload, 'base64url').toString('utf-8')
        const decodedPayload = JSON.parse(payloadJsonString)

        // check expiration
        if(!decodedPayload.exp){
            throw new JWTError("No expiration claim found")
        }

        if(Date.now() >= parseInt(decodedPayload.exp)){
            throw new JWTError("Token expired")
        }

        // Signature verify
        const genratedSignature = crypto.createHmac('sha256', secretKey).update(`${encodedHeader}.${encodePayload}`).digest('base64url')
        
        if(signature !== genratedSignature){
            throw new JWTError("Invalid token")
        }

        return decodedPayload
    }
}