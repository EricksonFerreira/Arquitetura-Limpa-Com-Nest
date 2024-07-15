import {
  SearchResults as DefaultSearchResults,
  SearchParams as DefaultSearchParams,
  SearchableRepositoryInterface,
} from './../../../shared/domain/repositories/searchable-repository-contracts';
import { UserEntity } from '../entities/user.entity';

export namespace UserRepository {
  export type Filter = string;

  export class SearchParams extends DefaultSearchParams<Filter> {}

  export class SearchResults extends DefaultSearchResults<UserEntity, Filter> {}
  export interface Repository
    extends SearchableRepositoryInterface<
      UserEntity,
      Filter,
      SearchParams,
      SearchResults
    > {
    findByEmail(email: string): Promise<UserEntity | null>;
    emailExists(email: string): Promise<void>;
  }
}

// export interface UserRepository
//   extends SearchableRepositoryInterface<UserEntity, any, any> {
//   findByEmail(email: string): Promise<UserEntity | null>;
//   emailExists(email: string): Promise<void>;
// }
