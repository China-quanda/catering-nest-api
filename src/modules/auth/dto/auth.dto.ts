import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CodeDto {
  @ApiProperty({
    description: 'code',
    required:true
  })
  @IsString()
  @IsNotEmpty()
  code: string;
}
