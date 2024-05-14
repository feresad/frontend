import { Role } from "./role";

export class Users {
    id?: number;
    username: string = '';
    email: string = '';
    password: string = '';
    role: Role | null = null;
}
