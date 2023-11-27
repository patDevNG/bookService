import { Container } from "inversify";
import "reflect-metadata";
import { UserModel } from "./data/models/users.model";
import { UserRepository } from "./data/repositories/user.repository";
import { UserService } from "./services/user.service";
import { BookModel } from "./data/models/books.model";
import { BookRepository } from "./data/repositories/book.repository";
import { BookService } from "./services/book.service";
import { AuthorModel } from "./data/models/author.model";
import { AuthorRepository } from "./data/repositories/author.repository";
import { CategoryModel } from "./data/models/categories.model";
import { CategoryRepository } from "./data/repositories/category.repository";
import { CategoryService } from "./services/categories.service";
import { AuthorService } from "./services/author.service";
export const container = new Container({
  autoBindInjectable: true,
  defaultScope: "Singleton",
});

container.bind(UserModel).toSelf();
container.bind(UserRepository).toSelf();
container.bind(UserService).toSelf();
container.bind(BookModel).toSelf();
container.bind(BookRepository).toSelf();
container.bind(BookService).toSelf();
container.bind(AuthorModel).toSelf();
container.bind(AuthorRepository).toSelf();
container.bind(AuthorService).toSelf(); 
container.bind(CategoryModel).toSelf();
container.bind(CategoryRepository).toSelf();
container.bind(CategoryService).toSelf();


