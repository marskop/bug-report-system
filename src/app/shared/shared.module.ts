import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CommentsPipe } from "./pipes/comments.pipe";

@NgModule({
  declarations: [ CommentsPipe ],
  imports: [ CommonModule ],
  exports: [ CommentsPipe ]
})
export class SharedModule {}
