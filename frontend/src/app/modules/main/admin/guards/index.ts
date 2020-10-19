import { AuthenticationGuard } from "./authentication.guard";
import { RoleGuard } from "./role.guard";

export const guards = [
    AuthenticationGuard,
    RoleGuard
]

export * from "./authentication.guard";
export * from "./role.guard";