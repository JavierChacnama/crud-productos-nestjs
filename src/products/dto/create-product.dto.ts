import { IsNotEmpty, IsPositive, IsString } from "class-validator";

export class CreateProductDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    category: string;

    @IsPositive()
    price: number;

    @IsPositive()
    stock: number;
}
