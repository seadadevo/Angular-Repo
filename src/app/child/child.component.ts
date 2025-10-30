import { Component, Input, input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-child',
  standalone: true,
  imports: [],
  templateUrl: './child.component.html',
  styleUrl: './child.component.scss'
})
export class ChildComponent implements OnChanges, OnInit, OnDestroy {
  @Input() userNameFromParent: string = '';

  ngOnChanges(changes: SimpleChanges) {
    console.log('called')
  }

  ngOnInit(): void {
    console.log('no on init craeted')
  }

  ngOnDestroy(): void {
    console.log('destroied')
  }
  
  
}
