import { Matrix44 } from "./Matrix44";
import { Vector3 } from "./Vector3";
import { ObjectPool } from "../core/ObjectPool";
export declare class Vector4 {
    static dummy: Vector4;
    static pool: ObjectPool<Vector4>;
    get manhattanLength(): number;
    get x(): number;
    get y(): number;
    get z(): number;
    get w(): number;
    set x(x: number);
    set y(y: number);
    set z(z: number);
    set w(w: number);
    private _x;
    private _y;
    private _z;
    private _w;
    private _array;
    static fromArray(arr: number[]): void;
    static fromPool(): Vector4;
    constructor(x?: number, y?: number, z?: number, w?: number);
    set(x: number, y: number, z: number, w: number): this;
    copy(other: Vector4): this;
    multiply(scalar: number): this;
    toArray(): number[];
    transform(m: Matrix44): this;
    getVec3(out: Vector3): Vector3;
}
