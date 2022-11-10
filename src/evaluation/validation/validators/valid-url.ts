import { Injectable } from '@nestjs/common'
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator'

@ValidatorConstraint({ name: 'IsUrlValid' })
@Injectable()
export class IsUrlValidConstraint implements ValidatorConstraintInterface {
  private static Expression =
    /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/
  async validate(url: string | string[]): Promise<boolean> {
    if (Array.isArray(url)) {
      for (const item of url) {
        if (!IsUrlValidConstraint.Expression.test(item)) {
          return false
        }
      }

      return true
    }

    return IsUrlValidConstraint.Expression.test(url)
  }

  defaultMessage(): string {
    return 'At least one of provided url does not pass URL validation'
  }
}

export function IsUrlValid(validationOptions?: ValidationOptions) {
  return (object: unknown, propertyName: string): void => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUrlValidConstraint,
    })
  }
}
