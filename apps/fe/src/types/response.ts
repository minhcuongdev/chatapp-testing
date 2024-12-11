import { UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export type Response<T> = {
  success: boolean;
  message: string;
  data: T;
};
export interface SuccessResponse<Data> {
  success: boolean;
  message: string;
  data: Data;
}
export interface ErrorResponse {
  message: string;
  success: boolean;
  error: {
    errorCode: string;
    message: string;
  };
}
export type ActionResponse = SuccessResponse<{
  userId: number;
}>;

export type ConfigMutation<
  FieldPayload = unknown,
  FieldResponse = ActionResponse,
  ErrorType = ErrorResponse,
> = Omit<
  UseMutationOptions<FieldResponse, AxiosError<ErrorType, any>, FieldPayload>,
  'mutationFn'
>;
