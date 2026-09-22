export interface JwtPayloadType{
    sub:string,
    email:string,
    role:string,
    iat?:number,
    exp?:number
}