
/**
 * @interface LoginForm
 * @description Form fields used for user login.
 * @property {string} email - User's email address
 * @property {string} password - User's password
 */
export interface LoginCredentials {
    email: string;
    passwordHash: string;
  }