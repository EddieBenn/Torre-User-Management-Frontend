import axios from '../axiosSetup';

export const allusers = async(name?:any, city?:any)=>{
    try{
        const response = await axios.get(`/users?name=${name}&city=${city}`)
        return response
    }catch(error:any){
        return error.response
      }
}

export const singleUser = async(id:string)=>{
    try{
        const response = await axios.get(`/users/${id}`)
        return response
    }catch(error:any){
        return error.response
      }
}

export const createUser = async(body:any)=>{
    try{
        const response = await axios.post('/users', body)
        return response
    }catch(error:any){
        return error.response
      }
}