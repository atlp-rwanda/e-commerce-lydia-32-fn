import CryptoJS from 'crypto-js';

const SECRET_KEY = import.meta.env.VITE_TOKEN_SECRET_KEY;
const EXPIRATION_TIME = import.meta.env.VITE_EXPIRATION_TIME;
const RealTime = EXPIRATION_TIME * 60 * 60 * 1000;

export function encodeToken(data: string): string {
    return CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
}

export function decodeToken(encodedData: string): string | null {
    try {
        const bytes = CryptoJS.AES.decrypt(encodedData, SECRET_KEY);
        return bytes.toString(CryptoJS.enc.Utf8);
    } catch (error) {
        console.error('Failed to decode token', error);
        return null;
    }
}


export function isTokenExpired(token: string): boolean {
    const loginDate = decodeToken(token);
    if (!loginDate) return true;

    const loginTime = new Date(loginDate).getTime();
    const currentTime = new Date().getTime();

    console.log(loginTime);
    console.log(currentTime);
    console.log(RealTime);


    return (currentTime - loginTime) > RealTime;
}