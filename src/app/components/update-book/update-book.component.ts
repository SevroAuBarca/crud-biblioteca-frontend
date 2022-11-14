import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  Renderer2,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksService } from 'src/app/services/books.service';

interface FormBook {
  title: string;
  author: string;
  editorial: string;
  pages: number;
  sinopsis: string;
  rating: number;
  coverImage?: File;
  checkbox: boolean;
}

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css'],
})
export class UpdateBookComponent implements OnInit, AfterViewInit {
  img?: File;
  checkoutForm = this.formBuilder.group<FormBook>({
    title: '',
    author: '',
    editorial: '',
    pages: 0,
    sinopsis: '',
    rating: 0,
    coverImage: new File([] as BlobPart[], ''),
    checkbox: false,
  });
  public book: any = {}!;
  @ViewChildren('imageView', { read: ElementRef })
  component!: QueryList<ElementRef>;
  @ViewChild('labelImg') labelImg!: ElementRef<HTMLLabelElement>;
  @ViewChild('image') input?: ElementRef<HTMLInputElement>;

  constructor(
    private formBuilder: FormBuilder,
    private Book: BooksService,
    private router: Router,
    private route: ActivatedRoute,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.getBook();
  }
  ngAfterViewInit(): void {
    // this.input!.nativeElement.style.backgroundImage = `url(${this.book.coverImage.url})`;
    console.log(this.input?.nativeElement);
  }

  onSubmit(e: Event): void {
    if (
      this.checkoutForm.get('coverImage')?.value!.name &&
      !this.checkoutForm.get('checkbox')?.value!
    ) {
      e.preventDefault();
      alert('Borra un campo o quita la imagen!!');
    } else {
      const formData = new FormData();

      // Process checkout data here
      console.log(this.checkoutForm.get('coverImage')?.value?.name);
      formData.append('title', this.checkoutForm.get('title')?.value!);
      formData.append('author', this.checkoutForm.get('author')?.value!);
      formData.append('editorial', this.checkoutForm.get('editorial')?.value!);
      formData.append('pages', '' + this.checkoutForm.get('pages')?.value!);
      if (Number(this.checkoutForm.get('sinopsis')?.value!) > 0) {
        formData.append(
          'sinopsis',
          '' + this.checkoutForm.get('sinopsis')?.value!
        );
      } else {
        formData.append('sinopsis', this.book.sinopsis);
      }
      formData.append('rating', '' + this.checkoutForm.get('rating')?.value!);
      formData.append(
        'checkbox',
        '' + this.checkoutForm.get('checkbox')?.value!
      );

      if (!(this.checkoutForm.get('coverImage')?.value?.name === '')) {
        formData.append(
          'coverImage',
          this.checkoutForm.get('coverImage')?.value!,
          'img'
        );
      }

      console.log(this.checkoutForm.value);

      this.Book.putBook(this.book._id, formData).subscribe((data) => {
        console.log(data);
        this.router.navigate([`/${data.body._id}`]);
        console.log('entro');
      });
    }
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
  getBook() {
    const id = this.route.snapshot.paramMap.get('id')!;
    console.log(id);
    this.Book.getBook(id).subscribe((data) => {
      this.book = data.body;
      console.log(this.book);
    });
  }
  changeChecked() {
    this.checkoutForm.patchValue({
      checkbox: this.input?.nativeElement.checked,
    });
    this.checkoutForm?.get('checkbox')?.updateValueAndValidity();
  }
}
