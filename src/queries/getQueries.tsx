import axios from "axios";

export async function getHello() {
    const response = await axios.get('http://localhost:3000');
    return response.data;
}

export async function getPublishedPosts() {
    const response = await axios.get('http://localhost:3000/feed');
    return response.data;
}
