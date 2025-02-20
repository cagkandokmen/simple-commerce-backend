import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'role', async: false })
export class CustomRoleValidator implements ValidatorConstraintInterface {
  validate(role: string) {
    return role === 'user' || role === 'admin'; 
  }
  defaultMessage(args: ValidationArguments) {
    return `${args.property} must be admin or user`;
  }
}
