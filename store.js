const knex = require('./db/index.js');

module.exports = {
    saltHashPassword,
    createUser({ first_name, last_name, email, password, address }) {
        const { secret_key = salt, hash } = saltHashPassword(password);
        console.log(`create user, ${first_name} ${last_name}, with email ${email} and password ${password}`)
        return knex('users').insert({
            first_name, 
            last_name,
            email,
            salt: secret_key,
            encrypted_password: hash,
            address
        })
    }
}


const saltHashPassword = (password) => {
    const secret_key = randomString();
    const hash = crypto.createHmac('sha256', secret_key).update(password).digest('hex');

    return {
        secret_key, hash
    }
}

const randomString = () => {
    return crypto.randomBytes(4).toString('hex');
}