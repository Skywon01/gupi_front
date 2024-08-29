import { Component, OnInit } from '@angular/core';
import {HomeButtonComponent} from "../../components/home-button/home-button.component";
import {PageService} from "../../services/page/page.component";

@Component({
  selector: 'app-welcome',
  standalone: true,
  templateUrl: './welcome.component.html',
  imports: [
    HomeButtonComponent
  ],
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

    constructor(private pageService: PageService) {
        this.pageService.setComponentType('home', 'Accueil', 'Bienvenue sur la page d\'accueil, veuillez choisir une section');
    }

  ngOnInit() { }

}
