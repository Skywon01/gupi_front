import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ApiService} from "../../services/api.service";
import {DirectoryModel} from "../../model/directory.model";
import {DirectoryService} from "../../services/directory.service";

@Component({
  selector: 'app-single-directory-displayer',
  standalone: true,
  imports: [],
  templateUrl: './single-directory-displayer.component.html',
  styleUrl: './single-directory-displayer.component.css'
})
export class SingleDirectoryDisplayerComponent implements OnInit{
    public directories: DirectoryModel[] = []
    directory_id!: number;
    directory: any;

    constructor(
        private readonly directoryService: DirectoryService,
        private route: ActivatedRoute, private apiService: ApiService) {
    }

    ngOnInit(): void {
        // this.route.params.subscribe(params => {
        //     this.directory_id = params['id'];
        //     this.loadDirectoryDetails();
        // });
    }

    // loadDirectoryDetails() {
    //     this.apiService.retrieveDirectoryById(this.directory_id).subscribe(
    //         (data) => {
    //             this.directory = data;
    //         },
    //         (error) => {
    //             console.error('Erreur de récupération:', error);
    //         }
    //     );
    // }
}
