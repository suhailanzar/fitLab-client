import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'availableSlots'
})
export class AvailableSlotsPipe implements PipeTransform {

  transform(items: any[], status: boolean): any[] {
    return items? items.filter(item => item.status === status) : [];
  }

}
