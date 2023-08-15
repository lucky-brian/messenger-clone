import {Injectable} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class refreshJwtAuthGuard extends AuthGuard('jwt-refresh') {}