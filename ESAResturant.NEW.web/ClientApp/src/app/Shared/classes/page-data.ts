
export class PagedData<T> {
    private _pageSize: number;
    
    public get pageSize(): number {
        return this._pageSize;
    }
    public set pageSize(thePageSize: number) {
        this._pageSize = thePageSize;
        this.calculateItems();
    }

    constructor(public totalCount: number, public numPages: number, pageSize: number, public currentPage: number, public items: T[]) {
        this._pageSize = pageSize;
    }

    public setPagedData(serverData: PagedData<T>): void {
        this.totalCount = serverData.totalCount;

        this.calculateItems();

        this.items = serverData.items;
    }

    calculateItems(): void {

        this.numPages = Math.ceil(this.totalCount / this.pageSize);

        if (this.numPages < 1) {
            this.currentPage = 1;
        } else if (this.currentPage > this.numPages) {
            this.currentPage = this.numPages;
        }

        
    }

    
}
