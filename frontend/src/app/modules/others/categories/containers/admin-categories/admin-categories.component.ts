import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoriesFormComponent } from '../../components';

//Models
import { Category, createEmptyCategory } from "../../models/index";

//Services
import { CategoriesService } from "../../services/index";

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html'
})
export class AdminCategoriesComponent implements OnInit {

  public categories: Array<Category>;
  public creating: boolean;
  
  public loading: boolean;

  public invalidForm: boolean;

  @ViewChild(CategoriesFormComponent)
  public formChild!: CategoriesFormComponent;

  constructor(
    private categoriesService: CategoriesService
  ) {
    this.categories = new Array<Category>(0);
    this.creating = false;
    this.invalidForm = false;
    this.loading = true;
  }

  ngOnInit(): void {

    this.getCategories();
  }

  private getCategories(): void {
    
    this.categoriesService.getCategories().subscribe( 
      response => {
        this.categories = response;
        this.loading = false;
      },
      error => {throw new Error(error)}
    );
  }

  //Html methods

  public changeModal(category: Category | null): void {

    if(this.creating = category == null)
      this.formChild.setCategoryValues(createEmptyCategory());
    else
      this.formChild.setCategoryValues(category);
  }

  //Categories methods
  public createOrUpdateCategory(): void {
    this.creating ? this.createCategory() : this.updateCategory();
  }

  private createCategory(): void {

    var category: Category = this.formChild.getCategoryValues();
    
    this.categoriesService.saveCategory(category).subscribe(
      response => {
        category._id = response._id;
        this.categories.push(category);
      },
      error => {throw new Error(error)}
    );
  }

  private updateCategory(): void {

    const category: Category = this.formChild.getCategoryValues();
    console.log(category);
    this.categoriesService.updateCategory(category).subscribe(
      response => {
        
        const index: number = this.categories.map((x) => { return x._id }).indexOf(category._id);
        this.categories[index] = category;
      },
      error => {throw new Error(error)}
    );
  }

  public deleteCategory(category: Category): void {
    
    this.categoriesService.deleteCategory(category._id).subscribe(
      response => {

        const index: number = this.categories.map((x) => { return x._id }).indexOf(category._id);
        this.categories.splice(index, 1);
      },
      error => {throw new Error(error)}
    );
  }
}