import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../environment';
import { Comment } from '../interfaces/comment.interface';

type CreateCommentDto = {
  text: string
  userId: string
  parentId?: string
}

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  http = inject(HttpClient)

  getComments(parentId: string = '') {
    return this.http.get<Comment[]>(`${environment.apiBaseUrl}/comments${parentId ? `?parentId=${parentId}` : ''}`)
  }

  createComment(comment: CreateCommentDto) {
    return this.http.post<Comment>(`${environment.apiBaseUrl}/comments`, comment)
  }
}
