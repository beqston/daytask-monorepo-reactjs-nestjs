import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsNotPastDate(validationOptions?: ValidationOptions) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: 'isNotPastDate',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: unknown) {
          if (typeof value !== 'string') return false;

          const limit = new Date();
          limit.setUTCDate(limit.getUTCDate() - 1);
          const minDate = limit.toISOString().slice(0, 10);

          return value >= minDate;
        },
      },
    });
  };
}