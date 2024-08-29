import {Component, OnInit} from '@angular/core';
import {PageService} from "../../services/page/page.component";
import {ListFileComponent} from "../../components/list-file/list-file.component";
import {ListDirectoriesComponent} from "../../components/list-directories/list-directories.component";
import {ActivatedRoute} from "@angular/router";
import {DirectoryService} from "../../services/directory.service";
import {DirectoryModel} from "../../model/directory.model";

@Component({
  selector: 'app-my-file',
  standalone: true,
    imports: [
        ListFileComponent,
        ListDirectoriesComponent
    ],
  templateUrl: './my-file.component.html',
  styleUrl: './my-file.component.css'
})
export class MyFileComponent implements OnInit{
    public directory: DirectoryModel[] = []
    constructor(private pageService: PageService,
                private readonly directoryService: DirectoryService,
                private route: ActivatedRoute,) {
        this.pageService.setComponentType('folder-open', 'Mes dossiers', 'Veuillez trouver l\'ensemble de vos dossiers');
    }

    async ngOnInit() {
        //Récupère l'eventuel paramètre id dans l'url
        this.route.params.subscribe(params => {
            const id = params['id']
            if (!id) {
                this.vaChercherTousLesDirectories()
            } else {
                this.vaChercherUnSeulDirectory(id)
            }

        })
    }

    async vaChercherTousLesDirectories(): Promise<void> {
        this.directory = await this.directoryService.getDirectoryAll()
        // console.log(this.directory)
    }

    async vaChercherUnSeulDirectory(id: string) {
        this.directory = await this.directoryService.getDirectoryOne(id)
        // console.log(this.directory)
    }

    onDirectoryAdded(newDirectory: DirectoryModel) {
        this.directory.push(newDirectory);
    }
}
