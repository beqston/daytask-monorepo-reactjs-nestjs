import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

const MIN_OFFSET_MS = 2 * 60 * 60 * 1000;

export function IsNotPastDateTime(validationOptions?: ValidationOptions) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: 'isNotPastDateTime',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(time: unknown, args: ValidationArguments) {
          const { date, tzOffset = 0 } = args.object as {
            date?: string;
            tzOffset?: number;
          };

          if (typeof time !== 'string' || typeof date !== 'string') return false;

          const [y, m, d] = date.split('-').map(Number);
          const [h, min] = time.split(':').map(Number);

          // მომხმარებლის ლოკალური დრო → UTC მილიწამებში
          const taskUtc = Date.UTC(y, m - 1, d, h, min) + tzOffset * 60_000;

          // უნდა იყოს მინიმუმ ახლა + 2 საათი (1 წუთის ტოლერანტობით)
          return taskUtc >= Date.now() + MIN_OFFSET_MS - 60_000;
        },
      },
    });
  };
}