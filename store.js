const knex = require('./db/index.js');
const crypto = require('crypto');

module.exports = {
    saltHashPassword,
    authenticate_user,
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

const randomString = () => {
    return crypto.randomBytes(4).toString('hex');
}

function saltHashPassword(password, secret_key = randomString()) {
    const hash = crypto.createHmac('sha256', secret_key).update(password).digest('hex');

    return {
        secret_key, hash
    }
}

function authenticate_user({ email, password }) {
    console.log(`Authenticating user ${ email } `);
    return knex('users').where({ email })
        .then( ([user]) => {
            if(!user) return { success: false }
            
            const { hash } = saltHashPassword({ password, secret_key: user.salt })
            
            return { success: hash === user.encrypted_password }
        })
}