import { UserImportStateType } from './user-import-state.enum.js';
export interface UserImport {
    id: number;
    state: {
        id: UserImportStateType;
        label: string;
    };
    createdAt: string;
}
//# sourceMappingURL=user-import.model.d.ts.map