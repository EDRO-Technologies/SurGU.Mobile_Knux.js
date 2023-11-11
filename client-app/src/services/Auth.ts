import axios from "axios";
import { User, UserToken } from "../models/User";

const API_URL = 'http://10.76.15.50:3000/auth/weeek'

export async function weekLogin(token: string): Promise<UserToken> {
  const { data } = await axios.get<UserToken>(`${API_URL}/${token}`);

  return data as UserToken;
}
