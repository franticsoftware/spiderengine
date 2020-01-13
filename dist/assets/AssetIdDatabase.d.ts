import { AsyncEvent } from "ts-events";
interface IdToPath {
    [id: string]: string;
}
/**
 * @hidden
 */
export declare class AssetIdDatabaseInternal {
    static readonly fileName: string;
    static readonly path: string;
    static events: {
        assetsDeleted: AsyncEvent<string[]>;
        assetMoved: AsyncEvent<string>;
    };
    static defaultAssetIds: IdToPath;
    static readonly idDatabase: IdToPath;
    static load(): Promise<void>;
    static reload(): Promise<void>;
    static setPath(id: string, path: string): void;
    static setPaths(idDatabase: {
        [id: string]: string;
    }, notify?: boolean): void;
    static save(): Promise<void>;
    static deleteId(id: string): void;
    static deleteIds(ids: String[], notify?: boolean): void;
}
export declare class AssetIdDatabase {
    static getPath: (id: string) => string | undefined;
}
export {};
