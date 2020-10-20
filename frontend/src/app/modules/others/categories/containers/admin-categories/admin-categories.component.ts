import { Component, OnInit } from '@angular/core';
import { Category } from '../../models';
import { CategoriesService } from '../../services';

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html'
})
export class AdminCategoriesComponent implements OnInit {

  public categories: Category[];

  constructor(
    private categoriesService: CategoriesService
  ) {
    this.categories = new Array<Category>(0);
  }

  ngOnInit(): void {
    this.getCategories();
  }

  private getCategories(): void {
    this.categoriesService.getCategories().subscribe(
      resolve => {
        this.categories = resolve;
      },
      error => {throw new Error(error)}
    );
  }

  //Html methods
  public deleteCategory(id: string): void {
    this.categoriesService.deleteCategory(id).subscribe(
      response => {
        const index: number = this.categories.map((x) => { return x._id }).indexOf(id);
        this.categories.splice(index, 1);
      },
      error => {throw new Error(error)}
    );
  }
}