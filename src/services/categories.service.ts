import { injectable } from 'inversify'
import { CategoryRepository } from '../data/repositories/category.repository'
import { ICategory } from '../data/entities/category.entities'

export interface ICategoryService {
  create(category: ICategory): Promise<ICategory>
  getCategoryByReferenceId(referenceId: string): Promise<ICategory | null>
}

@injectable()
export class CategoryService implements ICategoryService {
  private categoryRepository: CategoryRepository

  constructor(categoryRepository: CategoryRepository) {
    this.categoryRepository = categoryRepository
  }

  /**
   *
   * @param category
   * @returns category
   */
  public async create(category: ICategory): Promise<ICategory> {
    return await this.categoryRepository.create(category)
  }

  /**
   *
   * @param referenceId
   * @returns
   */
  public async getCategoryByReferenceId(
    referenceId: string
  ): Promise<ICategory | null> {
    return await this.categoryRepository.findByReferenceId(referenceId)
  }
}
