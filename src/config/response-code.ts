/**
 * Created by WebStorm.
 * User: chrischen
 * Date: 2022/9/2
 * Time: 22:58
 */

// export interface ResponseCodesType {
//   [key:string]: [number,string]
// }
//
// export type CodeKeys = keyof typeof ResponseCodes

export const ResponseCodes = {
  OK : [0, 'ok'],

  USER_NOT_LOGIN : [10010, 'user not login'],
  USER_NOT_EXIST : [10011, 'user not exist'],
  USER_EXIST: [10012, 'user is exist'],
  USERNAME_OR_PASSWORD_EMPTY : [10020, 'username or password empty'],
  USERNAME_OR_PASSWORD_INCORRECT : [10021,'username or password incorrect'],

  MISSING_PARAMETERS: [10050, 'missing parameters'],
  PARAMETERS_INCORRECT: [10051, 'parameters incorrect'],
}

