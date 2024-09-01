import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class UpdateProductDto {

    @IsNotEmpty()
    @IsString()
    name?: string;

    @IsNotEmpty()
    @IsString()
    description?: string;

    @IsNotEmpty()
    @IsString()
    category?: string;

    @IsPositive()
    price?: number;

    @IsPositive()
    stock?: number;
}
