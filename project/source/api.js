import fetch from 'isomorphic-fetch';

const baseUrl = 'https://jsonplaceholder.typicode.com';

const api = {
  posts: {
    // Metodo asincrono con valor por defecto 1
    async getList(page = 1) {
      // Pedir los datos y esperar a que se completen
      const response = await fetch(`${baseUrl}/posts?_page=${page}`);
      // Convertirlos a JSON
      const data = await response.json();
      // Devolverlos a quien lo consuma
      return data;
    },
    async getSingle(id = 1) {
      const response = await fetch(`${baseUrl}/posts/${id}`);
      const data = await response.json();
      return data;
    },
    async getComments(id = 1) {
      const response = await fetch(`${baseUrl}/post/${id}/comments`);
      const data = await response.json();
      return data;
    },
  },
  users: {
    async getSingle(id = 1) {
      const response = await fetch(`${baseUrl}/users/${id}`);
      const data = await response.json();
      return data;
    },
    async getPosts(id = 1) {
      const response = await fetch(`${baseUrl}/posts/?userId=${id}`);
      const data = await response.json();
      return data;
    },
  },
};

export default api;
