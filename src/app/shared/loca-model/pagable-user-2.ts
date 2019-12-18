import { UserLocaDto } from './user-loca-dto';

export interface PageableDataUserDto {
    returnObject: UserLocaDto[],
    errorMessage: string,
    status: string
}