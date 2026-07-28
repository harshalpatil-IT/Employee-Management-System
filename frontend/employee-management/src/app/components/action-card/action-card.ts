import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-action-card',
  standalone: true,
  imports: [],
  templateUrl: './action-card.html',
  styleUrl: './action-card.css'
})
export class ActionCard {

  @Input() title = '';

  @Input() icon = '';

  @Input() color = '#0d6efd';

  @Output() actionClick = new EventEmitter<void>();

  onClick() {

    this.actionClick.emit();

  }

}