import {
  AfterViewChecked,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  Renderer2,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { BooksService } from 'src/app/services/books.service';
interface inputBook {
  title: string | null;
  author: string | null;
  editorial: string | null;
  pages: number | null;
  rating: number | null;
  coverImage: String | null;
}
@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.css'],
})
export class CreateBookComponent implements OnInit, AfterViewChecked {
  img?: File;
  checkoutForm = this.formBuilder.group({
    title: '',
    author: '',
    editorial: '',
    pages: 0,
    sinopsis: '',
    rating: 0,
    coverImage: [] as File[],
  });
  @ViewChildren('imageView', { read: ElementRef })
  component!: QueryList<ElementRef>;
  @ViewChild('labelImg') labelImg!: ElementRef<HTMLLabelElement>;
  constructor(
    private formBuilder: FormBuilder,
    private Book: BooksService,
    private router: Router,
    private renderer: Renderer2,
    private host: ElementRef
  ) {}

  ngOnInit(): void {}

  ngAfterViewChecked() {
    console.log(this.component);
  }

  onSubmit(): void {
    const formData = new FormData();
    console.log(this.checkoutForm.get('rating')?.value);
    // Process checkout data here
    //console.log(this.checkoutForm.get('coverImage')?.value);
    formData.append('title', this.checkoutForm.get('title')?.value!);
    formData.append('author', this.checkoutForm.get('author')?.value!);
    formData.append('editorial', this.checkoutForm.get('editorial')?.value!);
    formData.append('pages', '' + this.checkoutForm.get('pages')?.value!);
    formData.append('sinopsis', '' + this.checkoutForm.get('sinopsis')?.value!);
    formData.append('rating', '' + this.checkoutForm.get('rating')?.value!);
    formData.append(
      'coverImage',
      this.checkoutForm.get('coverImage')?.value!,
      'img'
    );

    this.Book.postBook(formData).subscribe((data) => {
      console.log(data);
      this.router.navigate([`/${data.body._id}`]);
      console.log('entro');
    });
  }
  getFile(event: Event) {
    const f = (event.target as HTMLInputElement).files;
    const file: File | null = f?.item(0) as File;
    this.checkoutForm.patchValue({
      coverImage: file,
    });
    this.checkoutForm?.get('coverImage')?.updateValueAndValidity();

    const imageShow: FileReader = new FileReader();
    imageShow.readAsDataURL(file);
    imageShow.addEventListener('load', (e: Event) => {
      const { result } = imageShow;
      const img: HTMLImageElement = document.createElement('img');
      img.setAttribute('src', result as string);
      img.classList.add('w-full');
      this.renderer.appendChild(this.component.first.nativeElement, img);
      this.renderer.addClass(this.labelImg.nativeElement, 'hidden');
    });
  }
}
