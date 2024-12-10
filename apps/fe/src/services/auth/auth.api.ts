import { ActionFunction } from 'react-router-dom';
import apiServices from '../../configs/axios';
import { ActionResponse, Response } from '../../types/response';

export type TLogin = {
  email: string;
  password: string;
};

export type TRegister = {
  email: string;
  password: string;
  name: string;
};

export const auth = {
  login(params: TLogin): Promise<ActionResponse> {
    return apiServices.post('/auth/login', params);
  },
  register(params: TRegister): Promise<ActionResponse> {
    return apiServices.post('/auth/register', params);
  },
};
