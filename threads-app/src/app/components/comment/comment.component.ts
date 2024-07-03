import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CommentFormComponent } from '../comment-form/comment-form.component';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [CommonModule, CommentFormComponent],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent {
  isExpanded = false
  isReplying = false

  toggleExpanded = () => {
    this.isExpanded = !this.isExpanded
  }

  toggleIsReplying = () => {
    this.isReplying = !this.isReplying
    this.isExpanded = this.isReplying ? true : this.isExpanded
  }
}
