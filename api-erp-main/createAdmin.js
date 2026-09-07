const Admin = require('./models/Admin');
const bcrypt=require('bcrypt')

async function createAdmin() {
    try {

        let adminExits = await Admin.findOne({ email: 'aditya@yopmail.com'})
        if (adminExits) {
            console.log("Admin Updated...")
        } else {

            let admin = new Admin();
    
            admin.firstName = 'Aaditya';
            admin.lastName = 'Narayan';
            admin.email = 'aditya@yopmail.com';
            let encryptedPassword = bcrypt.hashSync("aditya@123", 10);
            admin.password = encryptedPassword;
            
    
            await admin.save();
        }

    } catch (error) {
        console.log(error);
    }
}

module.exports = createAdmin;