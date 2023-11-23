const app =require( './app.js')
const  connectDB  =require( './utils/mongoose.js')



const main=async()=>{
    app.listen(3000, ()=>{
        console.log('Server on port http://localhost:3000')
    })
    await connectDB()
}

main()




