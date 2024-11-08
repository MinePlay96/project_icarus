export abstract class AEvent {
  static readonly eventName: string;

  [paramName: string]: unknown;
}

export type EventType<
  EventName extends string | symbol,
  ParameterType extends unknown[],
  ReturnType,
> = {
  eventName: EventName;
  parameterType: ParameterType;
  returnType: ReturnType;
};

export type TestEvent = EventType<'Test', [string, object], string>;
