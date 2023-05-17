import { Ability, AbilityBuilder, AbilityClass, ExtractSubjectType, InferSubjects } from '@casl/ability';
import { CaslAbilityFactory, AppAbility } from './casl-ability.factory';
import { Action } from '../../enums/role.enum';
import { User } from 'src/user/entities/user.entity';

describe('CaslAbilityFactory', () => {
  let caslAbilityFactory: CaslAbilityFactory;

  beforeEach(() => {
    caslAbilityFactory = new CaslAbilityFactory();
  });

  it('should create an ability for the user with admin role', () => {
    const adminUser: User = {
      // provide necessary properties for an admin user
      admin: true,
      email: '',
      hashedPassword: '',
      name: '',
      username: '',
      acceptTerms: false
    };

    const ability = caslAbilityFactory.createForUser(adminUser);

    expect(ability).toBeInstanceOf(Ability);
    // Additional assertions specific to the admin user's ability
    expect(ability.can(Action.Manage, 'all')).toBe(true);
  });

  it('should create an ability for the user without admin role', () => {
    const regularUser: User = {
      // provide necessary properties for a regular user
      admin: false,
      email: '',
      hashedPassword: '',
      name: '',
      username: '',
      acceptTerms: false
    };

    const ability = caslAbilityFactory.createForUser(regularUser);

    expect(ability).toBeInstanceOf(Ability);
    // Additional assertions specific to the regular user's ability
    expect(ability.can(Action.Read, 'all')).toBe(true);
  });
});