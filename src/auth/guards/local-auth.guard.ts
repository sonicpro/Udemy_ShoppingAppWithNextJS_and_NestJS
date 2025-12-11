import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// The constructor parameter correspons to the default name of PassportStrategy class.
// If PassportStrategy is imported from passport-local package, the name is 'local'.
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}
