import { Position } from '../interfaces/position';

export interface NodeConfig {
    [keys: string]: any
}

export abstract class FlowNode {
    // Abstract

    protected abstract nodeType: string;
    protected abstract nodeIcon: string;

    public abstract initFromConfig (config: NodeConfig): void;

    public abstract storeToConfig (): NodeConfig;

    // Override-able

    protected customName: string | null                                         = null;
    protected canRename: boolean                                                = true;
    protected state: 'normal' | 'selected' | 'errored' | 'warning' | 'modified' = 'normal';

    public getNodeType (): string {
        return this.nodeType;
    }

    public getDisplayName (): string {
        return this.customName ?? this.nodeType;
    }

    public setCustomName (name: string) {
        if (this.canRename) {
            this.customName = name;
        }
    }

    public getNodeIcon (): string {
        return this.nodeIcon;
    }

    public getNodeId (): number {
        return this._nodeId;
    }

    public setNodeId (id: number) {
        this._nodeId = id;
    }

    public setState (state: 'normal' | 'selected' | 'errored' | 'warning' | 'modified') {
        this.state = state;
    }

    public getState (): 'normal' | 'selected' | 'errored' | 'warning' | 'modified' {
        return this.state;
    }

    public hasNodeNote (): boolean {
        return !!(this._nodeNote && this._nodeNote !== '');
    }

    public getNodeNote (): string {
        return this._nodeNote;
    }

    public setNodeNote (note: string) {
        this._nodeNote = note;
    }

    public getPosition (): Position {
        return this._position;
    }

    public setPosition (pos: Position) {
        this._position = pos;
    }

    /* +-=-=-=-=-=--=-=-=- Private -=-=-=-=-=--=-=-=-+ */

    private _nodeId: number     = -1;
    private _nodeNote: string   = '';
    // Default
    private _position: Position = { x: 0, y: 0 };

}