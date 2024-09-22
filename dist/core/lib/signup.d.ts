export type SignupMode = 'direct-registration' | 'request-registration';
export declare function isSignupAllowed(options: {
    signupMode: SignupMode;
    ip: string;
    body?: any;
}): Promise<{
    allowed: boolean;
    errorMessage?: string;
}>;
export declare function isSignupAllowedForCurrentIP(ip: string): boolean;
//# sourceMappingURL=signup.d.ts.map