export interface User {
    id: string;
    email: string;
    fullName?: string;
    role?: string; 
    isBanned?: boolean;
}

export interface AuthResponse {
    token: string;
    user: User;
}

