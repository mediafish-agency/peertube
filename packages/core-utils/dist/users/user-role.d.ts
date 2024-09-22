import { UserRightType, UserRoleType } from '@peertube/peertube-models';
export declare const USER_ROLE_LABELS: {
    [id in UserRoleType]: string;
};
export declare function hasUserRight(userRole: UserRoleType, userRight: UserRightType): boolean;
//# sourceMappingURL=user-role.d.ts.map