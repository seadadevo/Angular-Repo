import { NgClass } from '@angular/common';

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-left-sidebar',
  standalone: true,
  imports: [RouterModule, NgClass],
  templateUrl: './left-sidebar.component.html',
  styleUrl: './left-sidebar.component.scss',
})
export class LeftSidebarComponent {
  @Input() collapsed = false;

  @Output() onToggle = new EventEmitter<void>();

  items = [
    {
      routeLink: 'dashboard',
      icon: 'fa-solid fa-house',
      label: 'Dashboard',
    },
    {
      routeLink: 'products',
      icon: 'fa-solid fa-box-open',
      label: 'Products',
    },
    {
      routeLink: 'pages',
      icon: 'fa-solid fa-file',
      label: 'Pages',
    },
    {
      routeLink: 'settings',
      icon: 'fa-solid fa-gear',
      label: 'Settings',
    },
  ];

  toggleSidenav(): void {
    this.onToggle.emit();
  }
}
