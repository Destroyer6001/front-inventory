import { Component, OnInit, inject } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit{

  private categoryService = inject(CategoryService);
  private dialogRef = inject(MatDialogRef);
  public data = inject(MAT_DIALOG_DATA);

  ngOnInit(): void {
    
  }

  onNotClick(){

    this.dialogRef.close(3);

  }

  delete(){
    if(this.data != null)
    {
      this.categoryService.deleteCategories(this.data.id)
        .subscribe((data: any)=>{
          this.dialogRef.close(1);
        },(error: any)=>{
          this.dialogRef.close(2);
        })
    }
    else
    {
      this.dialogRef.close(2);
    }
  }

}
