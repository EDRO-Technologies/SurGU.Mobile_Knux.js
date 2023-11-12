import axios from "axios";
import { User, UserToken } from "../models/User";
import api from "../axios";


export async function weekLogin(token: string): Promise<UserToken> {
  const { data } = await api.get<UserToken>(`/auth/weeek/${token}`);

  return data as UserToken;
}


export async function getUser(): Promise<User> {
  const { data } = await api.get<User>(`/auth/user`);

  return data as User;
}

export async function getUserList(): Promise<User[]> {
  const { data } = await api.get<User[]>(`/user`);

  return data as User[];
}