import { Component, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryService } from 'src/app/modules/shared/services/category.service';
import { NewCategoryComponent } from '../new-category/new-category.component';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})

export class CategoryComponent implements OnInit {

  private categoryServices = inject(CategoryService);
  public dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);


  ngOnInit(): void {
    this.getCategories()
  }

  displayedColums: string[] = ['id','name','discription','actions']
  dataSource = new MatTableDataSource<CategoryElement>();


  getCategories():void {
    this.categoryServices.getCategories()
    .subscribe((data:any) => {
      console.log("Respuesta cateories : ", data)
      this.processCategoriesResponse(data);
    }, (error: any) => {
      console.log("Error: ", error)
    })
  }

  processCategoriesResponse(resp: any)
  {
    const dataCategory: CategoryElement[] = []

    if(resp.metadata[0].code = "00")
    {
      let listCategory = resp.categoryResponse.category;

      listCategory.forEach((element: CategoryElement) => {
        dataCategory.push(element);
      });

      this.dataSource = new MatTableDataSource<CategoryElement>(dataCategory);
    }
  }

  openCategoryDialog()
  {
    const dialogRef = this.dialog.open(NewCategoryComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      
      if(result == 1)
      {
        this.openSnackBar("Categoria agregada","Exito");
        this.getCategories();
      }
      else if(result == 2)
      {
        this.openSnackBar("Ups ha ocurrido un error","Error")
      }
    });

  }

  edit(id:number, name:string, discription:string)
  {
    const dialogRef = this.dialog.open(NewCategoryComponent, {
      data:{id: id, name: name, discription: discription},
      width: '450px'
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      
      if(result == 1)
      {
        this.openSnackBar("Categoria actualizada","Exito");
        this.getCategories();
      }
      else if(result == 2)
      {
        this.openSnackBar("Ups ha ocurrido un error","Error")
      }
    });
  }

  openSnackBar(message:string,action:string):MatSnackBarRef<SimpleSnackBar>
  {
    return this.snackBar.open(message,action,{
      duration: 2000
    })
  }

}



export interface CategoryElement{
  discription: string;
  id:number;
  name:string;
}
