export class UserModel{
    constructor(name,email,password,type,id){
        this.name = name;
        this.email = email;
        this.password = password;
        this.type = type;
    }

    static getAll()
    {
        return users;
    }
}


let users =[
    {
        id: 1,
        name : 'admin',
        email: 'admin@gamail.com',
        password: 'password@1',
        type: 'seller',
    }
]