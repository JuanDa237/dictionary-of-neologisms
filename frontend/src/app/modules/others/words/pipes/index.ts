import { FilterWordPipe } from "./filterWord.pipe";
import { TruncatePipe } from "./truncate.pipe";

export const pipes = [
    FilterWordPipe,
    TruncatePipe
]

export * from "./filterWord.pipe";
export * from "./truncate.pipe";