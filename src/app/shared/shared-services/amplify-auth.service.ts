import {Injectable} from '@angular/core';
import {Auth} from 'aws-amplify';
import {MatSnackBar} from '@angular/material/snack-bar';
import {InheritedSnackBarComponent, Theme} from '../shared-components/inherited-snack-bar/inherited-snack-bar.component';

export interface AuthError {
  code: string;
  message: string;
  other?: any;
}

@Injectable({
  providedIn: 'root'
})
export class AmplifyAuthService {

  constructor(private snackBar: MatSnackBar) {
  }

  async signIn(username, password): Promise<any> {
    return Auth.signIn(username, password)
      .then(response => {
        console.log('signIn response', response, response.challengeName);
        let returnResponse;
        if (response.challengeName) {
          /**
           * ChallengeName
           *
           * SMS_MFA | SOFTWARE_TOKEN_MFA | SELECT_MFA_TYPE | MFA_SETUP | PASSWORD_VERIFIER | CUSTOM_CHALLENGE | DEVICE_SRP_AUTH |
           * DEVICE_PASSWORD_VERIFIER | ADMIN_NO_SRP_AUTH | NEW_PASSWORD_REQUIRED
           */

          /**
           * ChallengeResponses
           *
           * SMS_MFA: SMS_MFA_CODE, USERNAME.
           * PASSWORD_VERIFIER: PASSWORD_CLAIM_SIGNATURE, PASSWORD_CLAIM_SECRET_BLOCK, TIMESTAMP, USERNAME.
           * NEW_PASSWORD_REQUIRED: NEW_PASSWORD, any other required attributes, USERNAME.
           * SOFTWARE_TOKEN_MFA: USERNAME and SOFTWARE_TOKEN_MFA_CODE are required attributes.
           * DEVICE_SRP_AUTH requires USERNAME, DEVICE_KEY, SRP_A (and SECRET_HASH).
           * DEVICE_PASSWORD_VERIFIER requires everything that PASSWORD_VERIFIER requires plus DEVICE_KEY.
           * MFA_SETUP requires USERNAME, plus you need to use the session value returned by VerifySoftwareToken in the Session parameter.
           */
          switch (response.challengeName) {
            case 'SMS_MFA':
            case 'SOFTWARE_TOKEN_MFA':
            case 'SELECT_MFA_TYPE':
            case 'MFA_SETUP':
            case 'PASSWORD_VERIFIER':
            case 'CUSTOM_CHALLENGE':
            case 'DEVICE_SRP_AUTH':
            case 'DEVICE_PASSWORD_VERIFIER':
            case 'ADMIN_NO_SRP_AUTH':
              break;
            case 'NEW_PASSWORD_REQUIRED':
              returnResponse = response;
              break;
          }
        }
        return new Promise(resolve => resolve(response?.username ? response : returnResponse)) as Promise<AuthError>;
      })
      .catch(error => {
        const returnResponse = this.AWSBasicError(error, {username});
        this.snackBar.openFromComponent(InheritedSnackBarComponent, {
          data: {
            message: returnResponse.message,
            theme: Theme.ERROR
          }
        });
        return new Promise((resolve, reject) => reject(returnResponse)) as Promise<AuthError>;
      });
  }

  async completeNewPassword(user, password, requiredAttributes?: any): Promise<any> {
    return Auth.completeNewPassword(user, password, requiredAttributes)
      .then((response) => {
        return new Promise((resolve) => resolve(response));
      })
      .catch((error) => {
        this.snackBar.openFromComponent(InheritedSnackBarComponent, {
          data: {
            message: error.message,
            theme: Theme.ERROR
          }
        });

        return new Promise((resolve, reject) => reject(error));
      });
  }

  async forgotPassword(username, requiredAttributes?: any): Promise<any> {
    return Auth.forgotPassword(username, requiredAttributes)
      .then((response) => {
        return new Promise((resolve) => resolve(response));
      })
      .catch((error) => {
        const returnResponse = this.AWSBasicError(error);
        this.snackBar.openFromComponent(InheritedSnackBarComponent, {
          data: {
            message: error.message,
            theme: Theme.ERROR
          }
        });
        return new Promise((resolve, reject) => reject(returnResponse)) as Promise<AuthError>;
      });
  }

  async forgotPasswordSubmit(username, code, password, requiredAttributes?: any): Promise<any> {
    return Auth.forgotPasswordSubmit(username, code, password, requiredAttributes)
      .then((response) => {
        return new Promise(resolve => resolve(response));
      })
      .catch((error) => {
        this.snackBar.openFromComponent(InheritedSnackBarComponent, {
          data: {
            message: error.message,
            theme: Theme.ERROR
          }
        });
      });
  }

  AWSBasicError(error, other?: any): AuthError {
    let code: string;
    let message: string;

    switch (error.name) {
      /**
       * AliasExistsException
       * This exception is thrown when a user tries to confirm the account with an email or phone number that has already been supplied
       * as an alias from a different account. This exception tells user that an account with this email or phone already exists.
       * HTTP Status Code: 400
       */
      case 'AliasExistsException':
      /**
       * CodeMismatchException
       * This exception is thrown if the provided code does not match what the server was expecting.
       * HTTP Status Code: 400
       */
      case 'CodeMismatchException':
      /**
       * ExpiredCodeException
       * This exception is thrown if a code has expired.
       * HTTP Status Code: 400
       */
      case 'ExpiredCodeException':
      /**
       * InternalErrorException
       * This exception is thrown when Amazon Cognito encounters an internal error.
       * HTTP Status Code: 500
       */
      case 'InternalErrorException':
      /**
       * InvalidLambdaResponseException
       * This exception is thrown when the Amazon Cognito service encounters an invalid AWS Lambda response.
       * HTTP Status Code: 400
       */
      case 'InvalidLambdaResponseException':
      /**
       * InvalidParameterException
       * This exception is thrown when the Amazon Cognito service encounters an invalid parameter.
       * HTTP Status Code: 400
       */
      case 'InvalidParameterException':
      /**
       * LimitExceededException
       * This exception is thrown when a user exceeds the limit for a requested AWS resource.
       * HTTP Status Code: 400
       */
      case 'LimitExceededException':
      /**
       * NotAuthorizedException
       * This exception is thrown when a user is not authorized.
       * HTTP Status Code: 400
       */
      case 'NotAuthorizedException':
      /**
       * PasswordResetRequiredException
       * This exception is thrown when a password reset is required.
       * HTTP Status Code: 400
       */
      case 'PasswordResetRequiredException':
      /**
       * ResourceNotFoundException
       * This exception is thrown when the Amazon Cognito service cannot find the requested resource.
       * HTTP Status Code: 400
       */
      case 'ResourceNotFoundException':
      /**
       * TooManyFailedAttemptsException
       * This exception is thrown when the user has made too many failed attempts for a given action (e.g., sign in).
       * HTTP Status Code: 400
       */
      case 'TooManyFailedAttemptsException':
      /**
       * TooManyRequestsException
       * This exception is thrown when the user has made too many requests for a given operation.
       * HTTP Status Code: 400
       */
      case 'TooManyRequestsException':
      /**
       * UnexpectedLambdaException
       * This exception is thrown when the Amazon Cognito service encounters an unexpected exception with the AWS Lambda service.
       * HTTP Status Code: 400
       */
      case 'UnexpectedLambdaException':
      /**
       * UserLambdaValidationException
       * This exception is thrown when the Amazon Cognito service encounters a user validation exception with the AWS Lambda service.
       * HTTP Status Code: 400
       */
      case 'UserLambdaValidationException':
      /**
       * UserNotFoundException
       * This exception is thrown when a user is not found.
       * HTTP Status Code: 400
       */
      case 'UserNotFoundException':
        code = error.name;
        message = error.message;
        break;
      default:
        code = error.name;
        message = error.message;
        break;
    }
    return {code, message, other};
  }
}
