import axios from 'axios';

// const instance = axios.create({
//   baseURL: "http://localhost:8080",
// });

const instance = axios.create({
  baseURL: "http://localhost:8080", // ✅ this is key
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});


export default instance;