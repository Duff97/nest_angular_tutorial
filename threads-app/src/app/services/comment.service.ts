import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  http = inject(HttpClient)

  getComments(parentId: string = '') {
    return this.http.get<Comment[]>(`${environment.apiBaseUrl}/comments${parentId ? `?parentId=${parentId}` : ''}`)
  }
}
