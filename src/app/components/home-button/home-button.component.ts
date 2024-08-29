import {Component, OnInit} from '@angular/core';
import {NzRowDirective} from "ng-zorro-antd/grid";
import {NgOptimizedImage} from "@angular/common";
import {RouterLink} from "@angular/router";
import {ApiService} from "../../services/api.service";

@Component({
  selector: 'app-home-button',
  standalone: true,
  imports: [
    NzRowDirective,
    NgOptimizedImage,
    RouterLink
  ],
  templateUrl: './home-button.component.html',
  styleUrl: './home-button.component.css'
})
export class HomeButtonComponent implements OnInit {
    ngOnInit() {
    }

    constructor(public apiService: ApiService) {
    }

}
