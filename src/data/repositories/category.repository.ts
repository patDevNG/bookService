import { injectable } from 'inversify';
import { CategoryModel } from '../models/categories.model';
import { ICategory} from '../entities/category.entities';

interface ICategoryRepository {
  create(category: ICategory): Promise<ICategory>;
  findByReferenceId(referenceId: string): Promise<ICategory | null>;
}

@injectable()
export class CategoryRepository implements ICategoryRepository {
  private categoryModel = CategoryModel;

  /**
   *
   * @param category
   * @returns category
   */
  public async create(category: ICategory): Promise<ICategory> {
    return await this.categoryModel.create(category);
  }

  /**
   *
   * @param referenceId
   * @returns
   */
  public async findByReferenceId(referenceId: string): Promise<ICategory | null> {
    return await this.categoryModel.findOne({ referenceId }).lean();
  }
}
