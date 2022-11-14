import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookComponent } from './components/book/book.component';
import { BooksComponent } from './components/books/books.component';
import { CreateBookComponent } from './components/create-book/create-book.component';
import { UpdateBookComponent } from './components/update-book/update-book.component';

const routes: Routes = [
  {
    path: '',
    component: BooksComponent,
  },
  {
    path: 'new',
    component: CreateBookComponent,
  },
  {
    path: ':id',
    component: BookComponent,
  },
  {
    path: 'edit/:id',
    component: UpdateBookComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
