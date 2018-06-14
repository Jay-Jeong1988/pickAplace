
module.exports = {
    createUser({ first_name, last_name, email, password, address }) {
        console.log(`create user, ${first_name} ${last_name}, with email ${email} and password ${password}`)
        return Promise.resolve();
    }
}