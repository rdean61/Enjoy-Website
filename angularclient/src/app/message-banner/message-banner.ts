import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  imports: [RouterLink, RouterLinkActive],
  selector: 'app-message-banner',
  styleUrl: './message-banner.css',
  templateUrl: './message-banner.html',
})
export class MessageBanner {}
