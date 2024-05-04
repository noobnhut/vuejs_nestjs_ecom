import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/users/entities/user.entity';

export const HasRoles = (...role: Role[]) => SetMetadata('role', role);