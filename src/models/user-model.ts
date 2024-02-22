/**
 * User Interface
 * 
 * This interface represents a user in the system. It is used in various parts of the application
 * where user data is handled, such as authentication and user profile management.
 * The structure of the User object is as follows:
 *
 * @property {string} email - The email of the user. It is unique for each user and used for identification.
 * @property {string} password - The hashed password of the user. It is used for authentication.
 * 
 */

export interface User{
    email: string;
    password: string;
}