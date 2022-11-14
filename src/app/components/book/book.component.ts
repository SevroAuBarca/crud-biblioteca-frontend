import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksService } from 'src/app/services/books.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
})
export class BookComponent implements OnInit {
  public book: any = {}!;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private Book: BooksService
  ) {}

  ngOnInit(): void {
    this.getBook();
  }

  getBook() {
    const id = this.route.snapshot.paramMap.get('id')!;
    console.log(id);
    this.Book.getBook(id).subscribe((data) => {
      this.book = data.body;
      console.log(this.book);
    });
  }

  async deleteBook() {
    const res = await Swal.fire({
      title: `Seguro que quiees elimiar el libro "${this.book.title.trim()}"?`,
      text: 'No podra volver a recuperarlo!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminalo!',
      cancelButtonText: 'Cancelar',
    });

    if (res?.isConfirmed) {
      const id = this.route.snapshot.paramMap.get('id')!;
      this.Book.deleteBook(id).subscribe(async (_) => {
        const res = await Swal.fire(
          'Eliminado con exito!',
          'Su libro fue eliminado.',
          'success'
        );

        (res.isConfirmed || res.isDismissed) && this.router.navigate(['/']);
      });
    }
  }

  counter(i: number) {
    return new Array(i);
  }
}
