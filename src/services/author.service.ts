import { injectable } from 'inversify';
import { AuthorRepository } from '../data/repositories/author.repository';
import { IAuthor } from '../data/entities/author.entities';

interface IAuthorService {
  create(author: IAuthor): Promise<IAuthor>;
  getAuthorByReferenceId(referenceId: string): Promise<IAuthor | null>;
}

@injectable()
export class AuthorService implements IAuthorService {
  private authorRepository: AuthorRepository;

  constructor(authorRepository: AuthorRepository) {
    this.authorRepository = authorRepository;
  }

  /**
   *
   * @param author
   * @returns author
   */
  public async create(author: IAuthor): Promise<IAuthor> {
    return await this.authorRepository.create(author);
  }

  /**
   *
   * @param referenceId
   * @returns
   */
  public async getAuthorByReferenceId(referenceId: string): Promise<IAuthor | null> {
    return await this.authorRepository.findByReferenceId(referenceId);
  }
}