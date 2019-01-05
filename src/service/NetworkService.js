// fetch("http://localhost:8000/v1/login", { 
//     method: "POST",
//     headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//         username: log,
//         password: pass
//     })
// }).then( (r) => r.json())
// .then( r=> console.log(r))
// .catch( e => console.log(e))
export default async function http(url, method, query) {
    const baseUrl = "http://localhost:8000/v1";
    const settings = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: method
    }
    let URL = baseUrl+url;
    if (method == "POST") {
        settings.body = JSON.stringify({
            ...query
        })
    } else {
        URL+='?';
        for (let item in query) {
            URL+=`${[item]}=${item}&`;
        }
    } 
    return await fetch(URL, settings)
}