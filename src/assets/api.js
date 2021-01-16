import ES6Promise from "es6-promise";
ES6Promise.polyfill();
import axios from "axios";

export class JsonPlaceholderAPIService {
  static buy() {
    return axios.get('https://jsonplaceholder.typicode.com/posts/3')
  }
}

export class ReqresApiService {
  static buy() {
    return axios.get('https://reqres.in/api/products/3')
  }
}
