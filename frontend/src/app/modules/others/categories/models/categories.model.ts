export interface Category {
    _id: string;
    name: string;
}

export function createEmptyCategory(): Category {
    return {
        _id: '',
        name: ''
    } as Category;
}