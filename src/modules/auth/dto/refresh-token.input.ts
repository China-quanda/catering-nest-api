import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsJWT } from 'class-validator';
export class RefreshTokenInput {
  @IsNotEmpty()
  @IsJWT()
  @ApiProperty()
  token: string;
}
