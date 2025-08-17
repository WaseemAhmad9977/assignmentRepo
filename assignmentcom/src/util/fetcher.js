import axios from "axios";
axios.defaults.baseURL=' https://fakestoreapi.com'
const fetcher = async (url)=>{
    const {data} = await axios.get(url)
    return data
}

export default fetcher