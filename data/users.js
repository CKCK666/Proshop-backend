import bcrypt from  "bcryptjs"
const users=[
    {
        name:"admin-User",
        email:"admin123@gmail.com",
        password:bcrypt.hashSync("12345")
    },
    {
        name:"vishnu",
        email:"vishnu123@gmail.com",
        password:bcrypt.hashSync("12345")
    },
    {
        name:"ck",
        email:"ck123@gmail.com",
        password:bcrypt.hashSync("12345")
    }
]

export default users;