import { useMutation } from '@tanstack/react-query';
import { auth, TLogin, TRegister } from './auth.api';
import { ConfigMutation } from '../../types/response';

export const useLogin = (config?: ConfigMutation<TLogin>) => {
  return useMutation({
    mutationFn: (params: TLogin) => {
      console.log(params);
      return auth.login(params);
    },
    ...config,
  });
};

export const useRegister = (config?: ConfigMutation<TRegister>) => {
  return useMutation({
    mutationFn: (params: TRegister) => auth.register(params),
    ...config,
  });
};
