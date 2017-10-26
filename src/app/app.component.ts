import { Component, OnInit } from '@angular/core';
import { SearchService } from "./search.service";
import { Subject } from "rxjs/Subject";
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import {MdSnackBar} from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title = 'app';
  categories;
  myData;
  keyword= '';
  startAt = new Subject();
  items: FirebaseListObservable<any[]>;
  category: FirebaseListObservable<any[]>;
  subCategory: FirebaseListObservable<any[]>;
  itemTypes: FirebaseListObservable<any[]>;
  itemList: FirebaseListObservable<any[]>;

  selectedCategory;
  selectedSUB;
  selectedType;
  selectedItem;

  newCategory;
  newSubCategory;
  newItemType;
  newItem;

  constructor(
    //private searchService: SearchService,
    public snackBar: MdSnackBar,
    private db: AngularFireDatabase
  ){}

  ngOnInit(){
    // this.searchService.getCategories(this.startAt)
    //   .subscribe(categories => this.categories = categories);
    this.category = this.db.list('/category');
    this.categories = this.db.list('/categories');
  }

  // dataSource = (keyword: any) => {

  // };

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  addCategory () {
    if(this.newCategory && this.newCategory!=''){
        this.category.set(this.newCategory, true);
        this.newCategory = '';
        this.openSnackBar('Category Added', '');
      }else{
        this.openSnackBar('Type Category', '');
      }
  }

  addSubCategory () {
    if(this.selectedCategory && this.newSubCategory && this.newSubCategory!=''){
        this.subCategory.set(this.newSubCategory, true);
        this.newSubCategory = '';
        this.openSnackBar('Sub Category Added', '');
      }else{
        this.openSnackBar('Select Category and Enter Sub Category', '');
      }
  }
  
  addType(){
    if(this.selectedSUB && this.newItemType && this.newItemType!=''){
      this.itemTypes.set(this.newItemType, true);
      this.newItemType = '';
      this.openSnackBar('item Type Added', '');
    }else{
      this.openSnackBar('Select Sub Category and Fill Item Type', '');
    }
  }

  addItem(){
    if( this.selectedType && this.newItem && this.newItem!=''){
      this.itemList.set(this.newItem, true);
      this.categories.push({
        category: this.selectedCategory,
        subCategory: this.selectedSUB,
        itemType: this.selectedType,
        item: this.newItem
      });
      this.newItem = '';
      this.openSnackBar('item Added', '');
    }else{
      this.openSnackBar('Select Type and Enter Item', '');
    }
  }

  getSub(){
    console.log(this.selectedCategory);
    this.subCategory = this.db.list('/category/' + this.selectedCategory);
  }

  getType(){
    console.log(this.selectedSUB);
    this.itemTypes = this.db.list('/subCategory/' + this.selectedSUB);
  }

  getItem(){
    console.log(this.selectedType);
    this.itemList = this.db.list('/itemTypes/' + this.selectedType);
  }


  // search($event){
  //   let q = $event.target.value;
  //   this.startAt.next(q);

  //   console.log(this.keyword);
  //   this.items = this.db.list('/categories', {
  //     query: {
  //       // startAt: this.keyword,
  //       // endAt: this.keyword + "\uf8ff"
  //         limitToLast: 2,
  //         startAt: this.keyword,
  //         endAt: this.keyword + '\uf8ff',
  //         orderByChild: 'cateogry'
  //         // orderByKey: true
  //     }
  //   });
  // }

  
}
