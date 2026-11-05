import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '../app/header/header';
import { Footer } from '../app/footer/footer';
import { MessageBanner } from '../app/message-banner/message-banner';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, MessageBanner],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('angularclient');
}
