export class Setting {
    constructor() {

        this.id = 0;
        this.name = '';
        this.value = '';
        this.isDefault = false;
        this.isDelete = false;
    }
    id: number;
    name: string;
    value: string;
    isDefault: boolean;
    isDelete: boolean;
}