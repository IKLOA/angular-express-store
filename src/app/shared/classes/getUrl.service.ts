import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class GetUrlService {
  static getUrl(id: string): string {
    return `http://localhost:3000/${id}`;
  }
}
