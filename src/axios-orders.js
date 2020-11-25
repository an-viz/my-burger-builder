import axios from 'axios';

const instance = axios.create({
    baseURL : 'https://react-burger-builder-3c0c3.firebaseio.com/'
});

export default instance;