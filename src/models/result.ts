/**
 * User Interface
 * 
 * This interface represents a user in the system. It is used in various parts of the application
 * where user data is handled, such as authentication and user profile management.
 * 
 * @property {boolean} success - type for result of requisition
 * @property {string} message - Message for result of requisition
 * @property {any} data - Object for result of requisition
 */

export interface Result{
    success: boolean;
    message: string;
    [key: string]: any;
}