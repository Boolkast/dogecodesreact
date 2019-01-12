export default async function http(url, method, query, token) {
  const baseUrl = 'https://dogecodes-chat-api.herokuapp.com/v1';
  const settings = {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method,
  };
  let URL = baseUrl + url;
  if (method === 'POST') {
    settings.body = JSON.stringify({
      ...query,
    });
  } else {
    URL += '?';
    // eslint-disable-next-line
    for (const item in query) {
      URL += `${[item]}=${item}&`;
    }
  }
  return await fetch(URL, settings);
}
