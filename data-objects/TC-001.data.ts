/**
 * Negative login test cases.
 * Use undefined for username/password to mean "use valid credentials from env".
 */
export type LoginNegativeCase = {
  title: string;
  username?: string;
  password?: string;
  errorPattern: RegExp;
};

export const loginNegativeCases: LoginNegativeCase[] = [
  {
    title: 'username and password empty',
    username: '',
    password: '',
    errorPattern: /username is required/i,
  },
  {
    title: 'username empty',
    username: '',
    password: undefined,
    errorPattern: /username is required/i,
  },
  {
    title: 'password empty',
    username: undefined,
    password: '',
    errorPattern: /password is required/i,
  },
  {
    title: 'invalid username and password',
    username: 'invalid',
    password: 'wrong',
    errorPattern: /do not match/i,
  },
  {
    title: 'valid username, wrong password',
    username: undefined,
    password: 'wrong_password',
    errorPattern: /do not match/i,
  },
  {
    title: 'wrong username, valid password',
    username: 'unknown_user',
    password: undefined,
    errorPattern: /do not match/i,
  },
  {
    title: 'locked out user',
    username: 'locked_out_user',
    password: undefined,
    errorPattern: /locked out/i,
  },
];
