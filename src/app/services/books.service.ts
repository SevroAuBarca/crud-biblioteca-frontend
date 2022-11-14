import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

interface books {
  message: string;
  body: Body[];
}
interface book {
  message: string;
  body: Body;
}

interface Body {
  _id: string;
  title: string;
  author: string;
  editorial: string;
  pages: number;
  rating: number;
  coverImage: any[];
  __v?: number;
}

interface inputBook {
  title?: string | null;
  author?: string | null;
  editorial?: string | null;
  pages?: number | null;
  rating?: number | null;
  coverImage?: File | string;
  checkbox?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private url =
    'https://crud-biblioteca-backend-production.up.railway.app/api/v1/books';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data' }),
  };
  constructor(private http: HttpClient) {}

  getBooks(): Observable<books> {
    return this.http.get<books>(this.url);
  }

  getBook(id: String): Observable<book> {
    return this.http.get<book>(`${this.url}/${id}`);
  }

  postBook(data: any): Observable<book> {
    return this.http.post<book>(this.url, data);
  }

  putBook(id: String, data: any): Observable<any> {
    return this.http.put(`${this.url}/${id}`, data);
  }

  deleteBook(id: String): Observable<book> {
    return this.http.delete<book>(`${this.url}/${id}`);
  }
}
