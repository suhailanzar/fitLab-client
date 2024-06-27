import { Component , Input  } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {

  
  images: string[] = [
    'assets/illustrations/Running-bro.png', 'assets/illustrations/admin-work.png', 'assets/illustrations/Gym-trainer.png'
  ];
  interval: number = 4000; 

  currentSlide = 0;
  private timer: any;
  isSidebarOpen = false;



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



  ngOnInit() {
    this.startTimer();
  }

  ngOnDestroy() {
    this.stopTimer();
  }

  startTimer() {
    this.timer = setInterval(() => {
      this.nextSlide();
    }, this.interval);
  }

  stopTimer() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  prevSlide() {
    this.resetTimer();
    this.currentSlide = (this.currentSlide - 1 + this.images.length) % this.images.length;
  }

  nextSlide() {
    this.resetTimer();
    this.currentSlide = (this.currentSlide + 1) % this.images.length;
  }

  setSlide(index: number) {
    this.resetTimer();
    this.currentSlide = index;
  }

  resetTimer() {
    this.stopTimer();
    this.startTimer();
  }

 
}
