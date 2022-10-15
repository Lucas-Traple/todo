import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from 'src/models/todo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title: string = 'Minhas tarefas';

  public todos: Todo[] = [];
  public form!: FormGroup;

  private today: Date = new Date();
  public date: string = this.today.getFullYear() + '-' + (this.today.getMonth()+1) + '-' + this.today.getDate();
  
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(30),
        Validators.required
      ])],
      comment: ['', Validators.maxLength(300)]
    })

    this.load();
    // this.todos.push(new Todo(1, 'First Shore', true));
    // this.todos.push(new Todo(2, 'Second Shore', false));
    // this.todos.push(new Todo(3, 'Third Shore', false));
  }

  alterText(){
      if (this.title === 'Minhas tarefas') {
        this.title = 'Text';
      } else {
        this.title = 'Minhas tarefas';
      }
  }

  removeItem(todo: Todo){
    this.todos.splice(this.todos.indexOf(todo), 1);
    this.localstorageSave();
  }
  
  alterStatusItem(todo: Todo){
      todo.done = !todo.done;
      this.localstorageSave();
  }
  
  add(){
    this.todos.push(new Todo(
      this.todos?.length === 0 ? 1 : (+this.todos[this.todos?.length - 1]?.id + 1), 
      this.form.controls['title'].value,      
      false));
      this.localstorageSave();
      this.form.reset();
  }

  showItemDetails(todo: Todo) {
    
  }

  localstorageSave(){
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  load(){
    this.todos = JSON.parse(localStorage?.getItem('todos')!);
  }

}

//    Binding
//() = HTML > TS
//[] = TS > HTML
//([]) = TS <> HTML