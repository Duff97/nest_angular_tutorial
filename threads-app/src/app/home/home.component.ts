import { Component, OnInit, inject, signal } from '@angular/core';
import { CommentComponent } from '../components/comment/comment.component';
import { CommentService } from '../services/comment.service';
import { CommonModule } from '@angular/common';
import { Comment } from '../interfaces/comment.interface';
import { CommentFormComponent } from '../components/comment-form/comment-form.component';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommentComponent, CommentFormComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  commentService = inject(CommentService)
  comments = signal<Comment[]>([])
  userService = inject(UserService)
  
  ngOnInit(): void {
    this.getComments()  
  }

  getComments() {
    this.commentService.getComments()
      .subscribe((comments) => {
        this.comments.set(comments)
      })
  }

  createComment(formValues: {text: string}) {
    const {text} = formValues
    const user = this.userService.getUserFromStorage()

    if (!user)
      return

    this.commentService.createComment({
      text,
      userId: user._id,
    }).subscribe(comment => {
      this.comments.set([
        comment,
        ...this.comments()
      ])
    })
  }

  commentTrackBy(_index: number, comment: Comment) {
    return comment._id
  }
}
