import { Pipe, PipeTransform } from '@angular/core';
import { Slot } from '../models/trainer';

@Pipe({
  name: 'availableSlots'
})
export class AvailableSlotsPipe implements PipeTransform {
  transform(slots: Slot[], status: boolean): Slot[] {
    return slots.filter(slot => slot.status === status);
  }
}
