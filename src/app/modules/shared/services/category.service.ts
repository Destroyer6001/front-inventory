import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const base_url = "http://localhost:8080/api/v1";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  /**
   * 
   * Get all categories
   */
  getCategories(){
    const endpoint = `${base_url}/categories`;
    return this.http.get(endpoint);
  }

  /**
   * 
   * Save Categories
   */

  saveCategories(body: any){
    const endpoint = `${base_url}/categories`;
    return this.http.post(endpoint,body)
  }

  /**
   * 
   * @param body 
   * @param id 
   * @returns 
   */

  updateCategories(body: any, id: any){
    const endpoint = `${base_url}/categories/${id}`;
    return this.http.put(endpoint,body)
  }
}
