import { Component, Input, Output, EventEmitter , ViewEncapsulation  } from '@angular/core';

@Component({
  selector: 'app-reusable-table-admin',
  templateUrl: './reusable-table-admin.component.html',
  styleUrl: './reusable-table-admin.component.css',
  encapsulation: ViewEncapsulation.None

})
export class ReusableTableAdminComponent {
  @Input() data: any[] = [];
  @Input() columns: any[] = [];
  @Input() paginator: boolean = true;
  @Input() rows: number = 10;
  @Input() rowsPerPageOptions: number[] = [5, 10, 20];
  @Output() actionClick = new EventEmitter<{action: string, item: any}>();


  onActionClick(action: string, item: string) {
        this.actionClick.emit({action, item});
      }
    

}


