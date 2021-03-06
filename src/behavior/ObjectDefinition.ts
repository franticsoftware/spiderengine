
import { AssetReference, AssetChangedEvent } from "../serialization/AssetReference";
import { ObjectDeclaration } from "./ObjectDeclaration";
import { ReferenceArray } from "../serialization/ReferenceArray";
import { BasePin } from "./Pin";
import * as Attributes from "../core/Attributes";
import { BehaviorUtils, IObjectDefinition } from "./BehaviorUtils";
import { Asset } from "../assets/Asset";
import { IObjectManagerInternal } from "../core/IObjectManager";
import { ObjectProps } from "../core/Types";

@Attributes.displayName("Object Definition")
@Attributes.creatable(false)
export class ObjectDefinition extends Asset implements IObjectDefinition {

    set declaration(decl: ObjectDeclaration | null) {       
        this._declaration.asset = decl;
    }
    get declaration() { return this._declaration.asset; }
    get declarationId() { return this._declaration.id; }
    get pins() { return this._pins; }

    // Sadly these need to be public, short story to share functionality with Data Component through BehavioUtils
    _pins = new ReferenceArray(BasePin);

    private _declaration = new AssetReference(ObjectDeclaration);

    constructor(props?: ObjectProps<ObjectDefinition>) {        
        super();
        this.onDeclarationPinChanged = this.onDeclarationPinChanged.bind(this);
        this.onDeclarationChanged = this.onDeclarationChanged.bind(this);
        this._declaration.assetChanged.attach(this.onDeclarationChanged);
        if (props) {
            this.setState(props);
        }
    }

    isLoaded() {
        for (let pinRef of this._pins.data) {
            if (!BehaviorUtils.isPinLoaded(pinRef.instance as BasePin)) {
                return false;
            }
        }
        return true;
    }

    destroy() {
        if (this.declaration) {
            this.declaration.pinChanged.detach(this.onDeclarationPinChanged);
        }
        this._declaration.detach();
        super.destroy();
    }

    // tslint:disable-next-line
    setProperty(name: string, value: any) {
        super.setProperty(name, value);
        if (name === "_pins") {
            BehaviorUtils.updatePinAccessors(this);
        }
    }

    getPins() {
        return this._pins;
    }

    setPins(pins: ReferenceArray<BasePin>) {
        this._pins = pins;
    }

    findPinByName(name: string) {
        return this._pins.data.map(r => r.instance as BasePin).find(p => p.name === name);
    }

    private onDeclarationPinChanged(pinId: string) {
        if (this.declaration) {
            BehaviorUtils.buildPins(this, this.declaration);
            BehaviorUtils.updatePinAccessors(this);
            if (process.env.CONFIG === "editor") {
                IObjectManagerInternal.instance.saveObject(this);
            }
        }
    }

    private onDeclarationChanged(info: AssetChangedEvent) {
        let oldDecl = info.oldAsset as ObjectDeclaration;
        if (oldDecl) {
            oldDecl.pinChanged.detach(this.onDeclarationPinChanged);
        }
        let decl = info.newAsset as ObjectDeclaration;
        if (decl) {
            BehaviorUtils.buildPins(this, decl);
            BehaviorUtils.updatePinAccessors(this);
            decl.pinChanged.attach(this.onDeclarationPinChanged);
        }
    }
}
