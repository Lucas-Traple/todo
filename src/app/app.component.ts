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

  public mode = 'list';

  public todos: Todo[] = [];
  public form!: FormGroup;

  private today: Date = new Date();
  public date: string = this.today.getFullYear() + '-' + (this.today.getMonth()+1) + '-' + this.today.getDate();
  
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      id: [null],
      title: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(30),
        Validators.required
      ])],
      comment: ['', Validators.maxLength(300)]
    })

    this.load();
  }

  alterText(){
      if (this.title === 'Minhas tarefas') {
        this.title = 'Text';
      } else{
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
  
  update(){
    const id: number = this.form.controls['id'].value;
    this.removeItem(this.todos.filter(todo => todo.id == id)[0]);  

      this.todos.push(new Todo(
        id, 
        this.form.controls['title'].value,      
        false,
        this.form.controls['comment'].value));   
      
      this.localstorageSave();
      this.form.reset();
  }

  add(){      
    this.todos.push(new Todo(
        this.getId(), 
        this.form.controls['title'].value,      
        false,
        this.form.controls['comment'].value));   
      
      this.localstorageSave();
      this.form.reset();
  }

  private getId(){
    return this.todos?.length === 0 ? 0 
      : (+this.todos[this.todos?.length - 1]?.id + 1)
  }

  showItemDetails(todo: Todo) {
      this.form.patchValue({
        id: +todo.id,
        title: todo.title,
        comment: todo.comment
      });
  }

  localstorageSave(){
    localStorage.setItem('todos', JSON.stringify(this.todos));
    this.mode = 'list';
  }

  load(){
    this.todos = JSON.parse(localStorage?.getItem('todos')!);
  }

  changeMode(mode: string){
    console.log('Id: ' + this.form.controls['id'].value + ' tipo ' + typeof(this.form.controls['id'].value))
      this.mode = mode;
  }
}

//    Binding
//() = HTML > TS
//[] = TS > HTML
//([]) = TS <> HTML