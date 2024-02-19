import mongoose from 'mongoose'
export const connection = async () => {
  return  await mongoose.connect(process.env.CONNECT_URI)
  .then(res => console.log("connected..."))
  .catch(err => console.log("Error"))
  
}

