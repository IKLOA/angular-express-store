import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Category, Message, Position} from '../interfaces';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PositionsService {
  constructor(private http: HttpClient) {

  }

  fetch(categoryId: string): Observable<Position[]> {
    return this.http.get<Position[]>(`/api/position/${categoryId}`);
  }

  getById(positionId: string): Observable<Position> {
    return this.http.get<Position>(`api/position/byId/${positionId}`);
  }

  create(name: string, description: string, cost: string, image: File, categoryId: string, costWithDiscount?: string): Observable<Position> {
    const fd = new FormData();
    fd.append('name', name);
    fd.append('description', description);
    fd.append('cost', cost);
    fd.append('image', image, image.name);
    fd.append('categoryId', categoryId);
    if (costWithDiscount) {
      fd.append('costWithDiscount', costWithDiscount);
    }

    return this.http.post<Position>('/api/position', fd);
  }

  update(id: string, categoryId: string, name?: string, description?: string, cost?: string, image?: File, costWithDiscount?: string): Observable<Position> {
    const fd = new FormData();

    if (image) {
      fd.append('image', image, image.name);
    }

    if (name) {
      fd.append('name', name);
    }

    if (cost) {
      fd.append('cost', cost);
    }

    if (description) {
      fd.append('description', description);
    }

    if (costWithDiscount) {
      fd.append('costWithDiscount', costWithDiscount);
    }

    fd.append('categoryId', categoryId);


    return this.http.patch<Position>(`api/position/${id}`, fd);
  }

  remove(position: Position): Observable<Message> {
    return this.http.delete<Message>(`/api/position/${position._id}`);
  }

}
