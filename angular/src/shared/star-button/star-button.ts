import { Component, input, output, signal } from '@angular/core';
import { Event } from '@angular/router';

@Component({
  selector: 'app-star-button',
  imports: [],
  templateUrl: './star-button.html',
  styleUrl: './star-button.css',
})
export class StarButton {
    disabled = input<boolean>();
    selected = input<boolean>();
    clickEvent = output<Event>();

    onClick(photo: any) {
        this.clickEvent.emit(photo);
    }
}
