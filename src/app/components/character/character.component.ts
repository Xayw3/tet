import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren } from "@angular/core"; 
import { Character } from "src/app/models/characters.model";
import { CharactersService } from "src/app/services/characters.service";

@Component ({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})

export class CharacterComponent implements OnInit, AfterViewInit {
  @ViewChildren('theLastPage', { read: ElementRef })
  theLastPage: QueryList<ElementRef>

  characters: Character[] | any = []
  totalPages: number
  currentPage: number = 1
  observer: any

  constructor(private charactersService: CharactersService) {}

  ngOnInit(): void {
    this.getCharacters()
    this.intersectionObserver()
  }

  ngAfterViewInit() {
    this.theLastPage.changes.subscribe(characters => {
      if (characters.last) this.observer.observe(characters.last.nativeElement)
    })
  }

  getCharacters() {
    this.charactersService.getAll(this.currentPage).subscribe(characters => {
      const charactersData: Character[] | any = characters.results

      this.totalPages = characters.info.pages

      charactersData.forEach((el: any) => {
        this.characters.push(el)
      })
    })
  }

  intersectionObserver() {
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
}