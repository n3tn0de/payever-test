import fetch from 'node-fetch'
const parseJSON = response => response.json();

const checkStatus = response => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.status);
  error.response = response;
  throw error;
};

const api = process.env.REQRES_API_URL

export const getUser = (id, res) => {
  return fetch(`https://reqres.in/api/users/${id}`)
    .then(checkStatus)
    .then(parseJSON)
    .catch(error => {
      return res.status(error.response.status).send()
    })
}

export const getUserAvatar = (url, res) => {
  return fetch(url)
    .then(checkStatus)
    .catch(error => {
      return res.status(error.response.status).send()
    })
}
