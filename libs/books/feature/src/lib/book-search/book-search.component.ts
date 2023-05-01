import { Component, OnInit, OnDestroy } from '@angular/core';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import {
  addToReadingList,
  clearSearch,
  getAllBooks,
  ReadingListBook,
  searchBooks,
} from '@tmo/books/data-access';
import { FormBuilder } from '@angular/forms';
import { Book } from '@tmo/shared/models';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'tmo-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss'],
})
export class BookSearchComponent implements OnInit, OnDestroy {
  books$ = this.store.pipe(select(getAllBooks));
  private destroyed$ = new Subject();
  /*
    Creating a suscription for Instant Search value Changes
  */
  instantSearchSubscription: Subscription;
  searchForm = this.fb.group({
    term: '',
  });

  constructor(
    private readonly store: Store,
    private readonly fb: FormBuilder
  ) {}

  ngOnInit(): void {
    /*
      subscribing search term on  value changes
    */
    this.instantSearchSubscription = this.searchForm.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged(), takeUntil(this.destroyed$))
      .subscribe((searchKey) => {
        if (searchKey?.term) {
          this.searchBooks();
        } else {
          this.store.dispatch(clearSearch());
        }
      });
  }

  /*
    unsubscribing all the subscriptions on component destroy
  */
  ngOnDestroy(): void {
   this.destroyed$.next(true);
  }

  get searchTerm(): string {
    return this.searchForm.value.term;
  }

  formatDate(date: void | string) {
    return date
      ? new Intl.DateTimeFormat('en-US').format(new Date(date))
      : undefined;
  }

  addBookToReadingList(book: Book) {
    this.store.dispatch(addToReadingList({ book }));
  }

  searchExample() {
    this.searchForm.controls.term.setValue('javascript');
    this.searchBooks();
  }

  searchBooks() {
    if (this.searchForm.value.term) {
      this.store.dispatch(searchBooks({ term: this.searchTerm }));
    } else {
      this.store.dispatch(clearSearch());
    }
  }
}
