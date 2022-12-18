const { default: mongoose } = require("mongoose");
const { userSchema, conversationSchema} = require('./schema')

mongoose.set('bufferCommands', false);

mongoose.connect('mongodb+srv://admin:YLrj2GAsuZ7uR3fx@cluster0.3qabpdg.mongodb.net/?retryWrites=true&w=majority')
.then(() => {
    const userModel = mongoose.model('User', userSchema)

    const newAccount = new userModel(
        {
            email: 'test@email.com',
            password: '123456',
            address: 'something',
            birthday: '12/10/2022',
            firstname: 'nam',
            lastname: 'nguyen'
        }
    )

    newAccount.save((err) => {
        if(err) console.log(err)
    })
}
)
.catch((err) => console.log(err))

