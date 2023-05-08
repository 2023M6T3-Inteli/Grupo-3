import { ApiProperty } from "@nestjs/swagger";

export class CreateRankingDto {
    @ApiProperty({example: 'haxb3yziw1', description: 'id'})
    id?: string;

    @ApiProperty({example: 'Andrew Esteves', description: 'This is the name of the user on rank'})
    name?: string;

    @ApiProperty({example: 40, description: 'Rating of the user according to projects that he/she has completed'})
    score?: number;

    @ApiProperty({example: 'null', description: 'profile picture'})
    image?: string;
}
