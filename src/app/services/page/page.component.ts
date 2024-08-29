import {Component, Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
@Component({
  selector: 'app-page',
  standalone: true,
  imports: [],
  templateUrl: './page.component.html',
  styleUrl: './page.component.css'
})
export class PageService {
    icon: string = '';
    title: string = '';
    text: string = '';

    /**
     * Affiche les informations de la page en fonction du composant
     * @param icon
     * @param title
     * @param text
     */
    setComponentType(icon: string, title: string, text: string) {
        this.icon = icon;
        this.title = title;
        this.text = text;
    }
}
