/**
 * User Interface
 * 
 * This interface represents a user in the system. It is used in various parts of the application
 * where user data is handled, such as authentication and user profile management.
 * The structure of the User object is as follows:
 *
 * @property {string} Id - The id of the user. It is unique for each item.
 * @property {number} quantity - The quantity of item has.
 * @property {number} unitValue - The price of the item.
 * @property {string} type - The description of the tem.
 * 
 */
export interface Vegetables{
    Id?: number,
    quantity: number,
    unitValue?: number,
    type: string
}