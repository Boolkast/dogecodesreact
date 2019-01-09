export default async function http(url, method, query, token) {
    const baseUrl = "http://localhost:8000/v1";
    const settings = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: method
    }
    let URL = baseUrl+url;
    if (method == "POST") {
        settings.body = JSON.stringify({
            ...query,
        })
    } else {
        URL+='?';
        for (let item in query) {
            URL+=`${[item]}=${item}&`;
        }
    } 
    return await fetch(URL, settings)
}