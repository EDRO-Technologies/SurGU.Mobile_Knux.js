import axios from "axios";
import { User } from "../models/User";

const API_URL = 'http://localhost:3000/user'

export async function getAll(): Promise<User[]> {
  const { data } = await axios.get<User[]>(`${API_URL}/all`);

  return data as User[];
}

// export async function getUser(): Promise<User>{
//   const { data } = await axios.get<User>(`${API_URL}/get`);

//   return data as User;
// }