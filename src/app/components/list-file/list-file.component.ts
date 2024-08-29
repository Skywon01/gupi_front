import {Component, Input, OnInit} from '@angular/core';
import {
    NzListComponent,
    NzListItemActionComponent,
    NzListItemComponent,
    NzListItemMetaComponent
} from "ng-zorro-antd/list";
import {NzSkeletonComponent} from "ng-zorro-antd/skeleton";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";
import {NzTableComponent, NzThMeasureDirective} from "ng-zorro-antd/table";
import {NgForOf, NgIf, NgStyle} from "@angular/common";
import {NzDividerComponent} from "ng-zorro-antd/divider";
import {NzFlexDirective} from "ng-zorro-antd/flex";
import {NzDropdownMenuComponent} from "ng-zorro-antd/dropdown";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NzMenuDirective, NzMenuItemComponent} from "ng-zorro-antd/menu";
import {NzTreeComponent} from "ng-zorro-antd/tree";
import {NzPopconfirmDirective} from "ng-zorro-antd/popconfirm";
import {FormsModule} from "@angular/forms";
import {NzInputDirective} from "ng-zorro-antd/input";
import {NzTypographyComponent} from "ng-zorro-antd/typography";
import {NzPopoverDirective} from "ng-zorro-antd/popover";
import {NzMessageService} from "ng-zorro-antd/message";
import {FileModel} from "../../model/file.model";
import {FileService} from "../../services/file.service";

@Component({
    selector: 'app-list-file',
    standalone: true,
    imports: [
        NzListComponent,
        NzListItemComponent,
        NzSkeletonComponent,
        NzListItemMetaComponent,
        NzListItemActionComponent,
        NzButtonComponent,
        NzRowDirective,
        NzColDirective,
        NzTableComponent,
        NgForOf,
        NzDividerComponent,
        NzFlexDirective,
        NgIf,
        NzDropdownMenuComponent,
        NzIconDirective,
        NzMenuDirective,
        NzMenuItemComponent,
        NzTreeComponent,
        NzPopconfirmDirective,
        FormsModule,
        NzInputDirective,
        NzThMeasureDirective,
        NgStyle,
        NzTypographyComponent,
        NzPopoverDirective
    ],
    templateUrl: './list-file.component.html',
    styleUrl: './list-file.component.css'
})
export class ListFileComponent implements OnInit {
    @Input() directoryId!: number;
    files: FileModel[] = [];

    constructor(
        private fileService: FileService,
        private message: NzMessageService
    ) {
    }

    ngOnInit() {
        this.loadFiles();
    }

    loadFiles() {
        this.fileService.getFilesByDirectoryId(this.directoryId).subscribe(files => {
            // console.log('Loaded files:', files); // Vérifie ici les données
            this.files = files;
        }, error => {
            console.error('Error loading files:', error);
        });
    }

    download(fileId: number, fileName: string): void {
        this.fileService.downloadFile(fileId).subscribe(response => {
            if (response.body) {
                const blob = new Blob([response.body], {type: response.headers.get('Content-Type') || 'application/octet-stream'});

                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = fileName;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                a.remove();
            } else {
                console.error('No file content found in response.');
            }
        }, error => {
            console.error('Error downloading file:', error);
        });
    }

    deleteFile(id: number): void {
        this.fileService.deleteFile(id).subscribe(
            () => {
                this.message.success('Fichier supprimé avec succès');
                this.files = this.files.filter(file => file.id !== id);
            },
            error => {
                console.error('Error during file deletion:', error); // Vérifie l'erreur retournée
                this.message.error(error.error.message || 'Erreur lors de la suppression du fichier');
            }
        );
    }
}
