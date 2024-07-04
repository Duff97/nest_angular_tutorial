import { CommonModule } from '@angular/common';
import { Component, effect, inject, Input, signal } from '@angular/core';
import { CommentFormComponent } from '../comment-form/comment-form.component';
import { Comment } from '../../interfaces/comment.interface';
import { CommentService } from '../../services/comment.service';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [CommonModule, CommentFormComponent],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent {
  @Input() comment!: Comment
  isExpanded = signal(false)
  isReplying = signal(false)
  commentService = inject(CommentService)
  nestedComments = signal<Comment[]>([])

  nestedCommentsEffect = effect(() => {
    if (this.isExpanded()) {
      this.commentService.getComments(this.comment._id)
        .subscribe(comments => {
          this.nestedComments.set(comments)
        })
    }
  })

  toggleExpanded = () => {
    this.isExpanded.set(!this.isExpanded())
  }

  toggleIsReplying = () => {
    this.isReplying.set(!this.isReplying())
    this.isExpanded.set(this.isReplying() ? true : this.isExpanded())
  }
}
