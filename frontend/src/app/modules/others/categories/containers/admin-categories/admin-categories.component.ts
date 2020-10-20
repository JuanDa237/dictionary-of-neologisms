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
}