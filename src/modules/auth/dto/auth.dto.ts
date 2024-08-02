import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsNumber, IsPhoneNumber, IsString, MaxLength, MinLength } from "class-validator";

export class CodeDto {
  @ApiProperty({
    description: 'code',
    required:true
  })
  @IsString()
  @IsNotEmpty()
  code: string;
}


export class PhoneCodeLogin {
  @ApiProperty({
    description: '手机号码',
    required:true
  })
  // @Transform(({ value }) =>{
  //   console.log(value);
  //   console.log(Number(value));
  //   console.log( parseInt(value, 10));
    
    
  //   return  parseInt(value, 10)
  // })
  // @IsPhoneNumber('CN')
  @IsNotEmpty()
  // @MinLength(11)
  // @MaxLength(11)
  @Type(() => Number)
  phone: number;

  @ApiProperty({
    description: 'code',
    required:true
  })
  @IsString()
  @IsNotEmpty()
  code: string;
}

