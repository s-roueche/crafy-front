import axios from "axios";

async function getHello() {
    const response = await axios.get('http://localhost:3000');
    return response.data;
}
export {getHello};
