import fetch from 'cross-fetch';


export class API {
    //pide la informacion a traves del metodo Get
    recuperarInf(): Promise<Response> { 
        let resp = fetch('https://api.octoperf.com/app/desing/http-servers/{id}',{
            method: 'GET',
            headers :{
                "Content-type": "application/json"
            }
        })
        return resp as Promise<Response>;
    }
}    
