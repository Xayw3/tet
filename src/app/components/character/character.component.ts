import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren } from "@angular/core"; 
import { Subject, takeUntil } from "rxjs";
import { Character } from "src/app/models/characters.model";
import { CharactersService } from "src/app/services/characters.service";

@Component ({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})

export class CharacterComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren('theLastPage', { read: ElementRef })
  theLastPage: QueryList<ElementRef>

  destroy$: Subject<boolean> = new Subject<boolean>();

  characters: Character[] = []
  totalPages: number
  currentPage: number = 1
  observer: any

  constructor(private charactersService: CharactersService) {}

  ngOnInit(): void {
    this.getCharacters()
    this.intersectionObserver()
  }

  ngAfterViewInit(): void {
    this.theLastPage.changes
      .pipe(takeUntil(this.destroy$))
      .subscribe(characters => {
      if (characters.last) this.observer.observe(characters.last.nativeElement)
    })
  }

  private getCharacters(): void {
    this.charactersService.getAll(this.currentPage)
      .pipe(takeUntil(this.destroy$))
      .subscribe(characters => {
      const charactersData: Character[] | any = characters.results

      this.totalPages = characters.info.pages

      charactersData.forEach((el: Character) => {
        this.characters.push(el)
      })
    })
  }

  private intersectionObserver(): void {
    let options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
    }

    this.observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        if (this.currentPage < this.totalPages) {
          this.currentPage += 1
          this.getCharacters()
        }
      }
    }, options)
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}