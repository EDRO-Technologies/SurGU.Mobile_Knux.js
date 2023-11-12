import axios from "axios";
import { User, UserToken } from "../models/User";
import api from "../axios";


export async function weekLogin(token: string): Promise<UserToken> {
  const { data } = await api.get<UserToken>(`/chats/weeek/${token}`);

  return data as UserToken;
}


export async function getUser(): Promise<User> {
  const { data } = await api.get<User>(`/auth/user`);

  return data as User;
}