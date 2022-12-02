import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FirstLab';

  student: any;


  GetData(data: any) {
    this.student = data;
    // this.data=data;
  }
}
