import { User } from "../userContext";

const isSuperAdmin = (user: User) => user.role === 'admin';

export { isSuperAdmin }