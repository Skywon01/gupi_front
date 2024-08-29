import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {DirectoryService} from "../../services/directory.service";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
    selector: 'app-upload-file',
    standalone: true,
    imports: [
        FormsModule
    ],
    templateUrl: './upload-file.component.html',
    styleUrl: './upload-file.component.css'
})
export class UploadFileComponent {
    @Input() directoryId!: number;
    @Output() fileUploaded = new EventEmitter<void>();
    selectedFile!: null;
    @ViewChild('fileInput') fileInput: any;

    constructor(private directoryService: DirectoryService, private message: NzMessageService) {
    }

    onFileSelected(event: any) {
        this.selectedFile = event.target.files[0];
    }

    onSubmit() {
        if (this.selectedFile) {
            this.directoryService.uploadFile(this.selectedFile, this.directoryId).subscribe(response => {
                // console.log('File uploaded:', response);

                // Emit event to refresh file list
                this.fileUploaded.emit();

                // Show success message
                this.message.success('Fichier déposé avec succès !');

                // Reset file input
                this.selectedFile = null;
                this.fileInput.nativeElement.value = '';
            }, error => {
                // console.error('Error uploading file:', error);
                this.message.error('Fichier déposé avec succès');
            });
        }
}}
