import { Component, OnInit } from '@angular/core';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent implements OnInit {
  public books: any[] = [];
  constructor(private BookS: BooksService) {
    this.getAllBooks();
  }

  ngOnInit(): void {}

  getAllBooks() {
    this.BookS.getBooks().subscribe((data) => {
      this.books = data.body;
      console.log(this.books);
    });
  }
}
