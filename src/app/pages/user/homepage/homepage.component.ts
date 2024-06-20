import { Component } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {

  isSidebarOpen = false;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }


  weight!: number ;
  height!: number ;
  bmi!: number ;
  bmiCategory: string = '';

  calculateBMI() {
    if (this.weight && this.height) {
      this.bmi = (this.weight / (this.height * this.height))
      this.bmiCategory = this.getBMICategory(this.bmi);
    }
  }

  getBMICategory(bmi: number): string {
    if (bmi < 18.5) {
      return 'Underweight';
    } else if (bmi >= 18 && bmi <= 25) {
      return 'Normal weight';
    } else if (bmi >= 25 && bmi <= 30) {
      return 'Overweight';
    } else {
      return 'Obese';
    }
  }

}
