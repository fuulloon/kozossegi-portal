import { User } from "../model/user.model";

export interface UserState {
  isLoading: boolean;
  users: User[];
  error: string | null;
}
