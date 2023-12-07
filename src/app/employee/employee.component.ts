import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

declare var $: any; // Declaración de la variable $ como global
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  tasks: any[] = [];
  newTask: string = '';
  loading: boolean = false;
  selectedTask: any;
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loading = false; 
  }

  getTasks() {
    this.loading = true; // Activar el indicador de carga
    const endpoint = 'https://www.metcon7.xyz/task/task/';
    this.http.get<any[]>(endpoint).subscribe(
      (response) => {
        this.loading = false; // Desactivar el indicador de carga cuando se complete la solicitud
        this.tasks = response;
      },
      (error) => {
        console.error('Error al obtener las tareas:', error);
        this.loading = false; // Asegúrate de desactivar el indicador de carga en caso de error
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

  deleteTask() {
    if (this.tasks) {
      const endpoint = `https://www.metcon7.xyz/task/task/${this.tasks[0].id}/`;
      this.http.delete(endpoint).subscribe(
        () => {
          console.log('Tarea eliminada');
          const index = this.tasks.findIndex((t) => t.id === this.tasks[0].id);
          if (index !== -1) {
            this.tasks.splice(index, 1);
            $("#modalDeleteCar2").modal("hide");
  
            // Muestra una alerta de éxito
            Swal.fire({
              icon: 'success',
              title: 'Éxito',
              text: 'La tarea se ha eliminado exitosamente.',
            });
          }
          this.tasks = [];
        },
        (error) => {
          console.error('Error al eliminar la tarea:', error);
        }
      );
    }
  }
  
  
  modalDelete() {
    $("#modalDeleteCar2").modal("show");
  }
}