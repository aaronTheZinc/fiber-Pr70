import { User } from '../types/users'

const registerUser = (user: User) => {
    if(!user) return new Error('No User is present')
    console.log('user', user)
}

export default registerUser