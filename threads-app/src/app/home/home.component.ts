import { Component, OnInit, inject, signal } from '@angular/core';
import { CommentComponent } from '../components/comment/comment.component';
import { CommentService } from '../services/comment.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommentComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  commentService = inject(CommentService)
  comments = signal<Comment[]>([])
  
  ngOnInit(): void {
    this.getComments()  
  }

  getComments() {
    this.commentService.getComments()
      .subscribe((comments) => {
        this.comments.set(comments)
      })
  }
}
