import { Font } from "./Font";
import { FontShadow } from "./FontShadow";
import { FontTexture } from "./FontTexture";
export declare class FontFamily extends Font {
    family: string;
    size: number;
    bold: boolean;
    italic: boolean;
    set shadow(shadow: FontShadow | undefined);
    texture: FontTexture;
    private _shadow;
    private _filtering;
    constructor();
    setText(text: string): void;
    setAlignment(alignment: number): void;
    getTexture(): FontTexture;
    getWidth(): number;
    getHeight(): number;
    setProperty(name: string, value: any): void;
    prepareForRendering(screenScaleFactor: number, maxWidth: number): void;
    destroy(): void;
    private onShadowPropertyChanged;
}
