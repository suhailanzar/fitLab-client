import { Component } from '@angular/core';
import { trainerService } from '../../../core/services/trainer.service';
import { Subscription } from 'rxjs';
import { error } from 'console';

@Component({
  selector: 'app-revenue',
  templateUrl: './revenue.component.html',
  styleUrl: './revenue.component.css'
})
export class RevenueComponent {

  basicData: any;
  data: any;
  options: any;
  basicOptions: any;
  revenueSubcription:Subscription | null = null;

  constructor(
    private service:trainerService
  ){}

  ngOnInit() {
    this.getRevenueDetails();
  }

  getRevenueDetails() {
    this.revenueSubcription = this.service.getRevenueData().subscribe({
      next: (res: any) => {
        console.log('response is', res);
        if (res && res.revenueData) {
          const slotPayments = res.revenueData.filter((payment: { slotId: any; }) => payment.slotId);
          const coursePayments = res.revenueData.filter((payment: { courseId: any; }) => payment.courseId);
  
          const slotCounts: Map<string, number> = this.countPaymentsByDate(slotPayments);
          const courseCounts: Map<string, number> = this.countPaymentsByDate(coursePayments);

          console.log('slotcounts and coursecounts',slotCounts,courseCounts);
          
  
          const chartData = this.prepareChartData(slotCounts, courseCounts);
          this.lineChart(chartData);
        }
      },
      error: (err: any) => {
        console.log('error is', err);
      }
    });
  }

  private countPaymentsByDate(payments: any[]): Map<string, number> {
    const counts = new Map<string, number>();
    payments.forEach(payment => {
      const date = new Date(payment.paymentDate).toISOString().split('T')[0]; // Use the actual payment date
      counts.set(date, (counts.get(date) || 0) + payment.amount); // Sum the amount instead of counting
    });
    return counts;
  }

  // barChart(chartData: any[]) {

  //   const documentStyle = getComputedStyle(document.documentElement);
  //   const textColor = documentStyle.getPropertyValue('--text-color');
  //   const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
  //   const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

  //   this.data = {
  //     labels: chartData.map(item => item.date),
  //     datasets: [
  //       {
  //         label: 'booked slots',
  //         data: chartData.map(item => item.slotCount),
  //         fill: false,
  //         borderColor: documentStyle.getPropertyValue('--blue-500'),
  //         tension: 0.4
  //       },
  //       {
  //         label: 'Course Enrolled',
  //         data: chartData.map(item => item.courseCount),
  //         fill: false,
  //         borderColor: documentStyle.getPropertyValue('--pink-500'),
  //         tension: 0.4
  //       }
  //     ]
  //   };

  //   this.basicOptions = {
  //       plugins: {
  //           legend: {
  //               labels: {
  //                   color: textColor
  //               }
  //           }
  //       },
  //       scales: {
  //           y: {
  //               beginAtZero: true,
  //               ticks: {
  //                   color: textColorSecondary
  //               },
  //               grid: {
  //                   color: surfaceBorder,
  //                   drawBorder: false
  //               }
  //           },
  //           x: {
  //               ticks: {
  //                   color: textColorSecondary
  //               },
  //               grid: {
  //                   color: surfaceBorder,
  //                   drawBorder: false
  //               }
  //           }
  //       }
  //   };


  // }




  // pieChart() {

  //    const documentStyle = getComputedStyle(document.documentElement);
  //   const textColor = documentStyle.getPropertyValue('--text-color');

  //     this.data = {
  //       labels: ['A', 'B', 'C'],
  //       datasets: [
  //           {
  //               data: [540, 325, 702],
  //               backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500')],
  //               hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400')]
  //           }
  //       ]
  //   };

  //   this.options = {
  //       plugins: {
  //           legend: {
  //               labels: {
  //                   usePointStyle: true,
  //                   color: textColor,
  //                   responsive: false,
  //                   width:100,
  //                   height:100
  //               }
  //           }
  //       }
  //   };
  // }



  lineChart(chartData: any[]) {
    const documentStyle3 = getComputedStyle(document.documentElement);
    const textColor3 = documentStyle3.getPropertyValue('--text-color');
    const textColorSecondary3 = documentStyle3.getPropertyValue('--text-color-secondary');
    const surfaceBorder3 = documentStyle3.getPropertyValue('--surface-border');
  
    this.data = {
      labels: chartData.map(item => item.date),
      datasets: [
        {
          label: 'Slot Revenue',
          data: chartData.map(item => item.slotRevenue),
          fill: false,
          borderColor: documentStyle3.getPropertyValue('--blue-500'),
          tension: 0.4
        },
        {
          label: 'Course Revenue',
          data: chartData.map(item => item.courseRevenue),
          fill: false,
          borderColor: documentStyle3.getPropertyValue('--pink-500'),
          tension: 0.4
        },
        {
          label: 'Total Revenue',
          data: chartData.map(item => item.totalRevenue),
          fill: false,
          borderColor: documentStyle3.getPropertyValue('--green-500'),
          tension: 0.4
        }
      ]
    };
  
    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: textColor3
          }
        },
        tooltip: {
          callbacks: {
            label: function(context: any) {
              let label = context.dataset.label || '';
              if (label) {
                label += ': ';
              }
              if (context.parsed.y !== null) {
                label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
              }
              return label;
            }
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary3
          },
          grid: {
            color: surfaceBorder3,
            drawBorder: false
          }
        },
        y: {
          ticks: {
            color: textColorSecondary3,
            callback: function(value: any) {
              return '$' + value;
            }
          },
          grid: {
            color: surfaceBorder3,
            drawBorder: false
          }
        }
      }
    };
  }

  prepareChartData(slotCounts: Map<string, number>, courseCounts: Map<string, number>) {
    if (!slotCounts || !courseCounts) {
      console.error('Invalid input for prepareChartData');
      return [];
    }
  
    const allDates = new Set([...slotCounts.keys(), ...courseCounts.keys()]);
  
    const chartData = Array.from(allDates).map(date => ({
      date,
      slotRevenue: slotCounts.get(date) || 0,
      courseRevenue: courseCounts.get(date) || 0,
      totalRevenue: (slotCounts.get(date) || 0) + (courseCounts.get(date) || 0)
    }));
  
    chartData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
    console.log('Chart data:', chartData);
  
    return chartData;
  }


  ngOnDestroy() {
    if (this.revenueSubcription) {
      this.revenueSubcription.unsubscribe();
    }
  }

}


