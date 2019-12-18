import { PageModel } from '../models/page-model';

export interface PageableData {
    returnObject: PageModel,
    errorMessage: string,
    status: string
}