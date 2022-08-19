import { Injectable } from "@angular/core";
import {HttpClient} from '@angular/common/http'
import { delay, Observable } from "rxjs";
import { CharacterApi } from "../models/characters.model";

@Injectable({
  providedIn: 'root'
})

export class CharactersService {
  constructor(private http: HttpClient) {}

  getAll(page: number): Observable<CharacterApi> {
    return this.http
      .get<CharacterApi>(`https://rickandmortyapi.com/api/character?page=${page}`)
      .pipe(delay(1000))
  }
}
