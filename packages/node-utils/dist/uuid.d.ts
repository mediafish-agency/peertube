import short, { SUUID } from 'short-uuid';
declare function buildUUID(): short.UUID;
declare function buildSUUID(): SUUID;
declare function uuidToShort(uuid: string): string;
declare function shortToUUID(shortUUID: string): string;
declare function isShortUUID(value: string): boolean;
export { buildUUID, buildSUUID, uuidToShort, shortToUUID, isShortUUID };
export type { SUUID };
//# sourceMappingURL=uuid.d.ts.map