import Request from "../common/request.js";
export const getConcept=()=>Request.get('/document/concept/摩擦')
export const uploadResource=(params)=>Request.file('/document/resource/upload',params)