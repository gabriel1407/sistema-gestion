import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  tasks: any[] = [];
  newTask: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getTasks();
  }

  getTasks() {
    const endpoint = 'https://www.metcon7.xyz/task/task/';
    this.http.get<any[]>(endpoint).subscribe(
      (response) => {
        this.tasks = response;
      },
      (error) => {
        console.error('Error al obtener las tareas:', error);
      }
    );
  }

  addTask() {
    const endpoint = 'https://www.metcon7.xyz/task/task/';
    const payload = { task: this.newTask };
    this.http.post<any>(endpoint, payload).subscribe(
      (response) => {
        console.log('Tarea creada:', response);
        this.tasks.push(response);
        this.newTask = '';
      },
      (error) => {
        console.error('Error al crear la tarea:', error);
      }
    );
  }

  updateTask(task: any) {
    const endpoint = `https://www.metcon7.xyz/task/task/${task.id}/`;
    const payload = { task: task.task };
    this.http.put<any>(endpoint, payload).subscribe(
      (response) => {
        console.log('Tarea actualizada:', response);
      },
      (error) => {
        console.error('Error al actualizar la tarea:', error);
      }
    );
  }

  deleteTask(task: any) {
    const endpoint = `https://www.metcon7.xyz/task/task/${task.id}/`;
    this.http.delete(endpoint).subscribe(
      () => {
        console.log('Tarea eliminada');
        const index = this.tasks.findIndex((t) => t.id === task.id);
        if (index !== -1) {
          this.tasks.splice(index, 1);
        }
      },
      (error) => {
        console.error('Error al eliminar la tarea:', error);
      }
    );
  }

  // modal() {
  //   $("#tareas").modal("show");
  // }
}