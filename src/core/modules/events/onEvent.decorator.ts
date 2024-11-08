import { SetMetadata } from '@nestjs/common';
import { OnEvent as OnEventNative } from '@nestjs/event-emitter';
import { AEvent, EventType } from './AEvent';

// eslint-disable-next-line @typescript-eslint/ban-types
type TypedMethodDecorator<T extends Function> = (
  target: object,
  propertyKey: string | symbol,
  descriptor: TypedPropertyDescriptor<T>,
) => TypedPropertyDescriptor<T> | void;

// export function OnEvent<T extends EventType<string, T['parameterType'], T['returnType']>>(
//   eventName?: T['eventName'],
//   options?: object,
// ): TypedMethodDecorator<(...params: T['parameterType']) => T['returnType']> {
//   return function (
//     target: object,
//     propertyKey: string | symbol,
//     descriptor: TypedPropertyDescriptor<
//       (...params: T['parameterType']) => T['returnType']
//     >,
//   ) {
//     return descriptor;
//   };
//   const decoratorFactory = OnEventNative(eventName, options);

//   console.log(decoratorFactory);

//   return decoratorFactory;
// }
