import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NzMessageService} from "ng-zorro-antd/message";
import {DirectoryService} from "../../services/directory.service";
import {AuthService} from "../../services/authentification/auth.service";
import {UserModel} from "../../model/user.model";
import {UsernotificationService} from "../../services/usernotification.service";

@Component({
  selector: 'app-upload-file-user',
  standalone: true,
    imports: [
        FormsModule
    ],
  templateUrl: './upload-file-user.component.html',
  styleUrl: './upload-file-user.component.css'
})
export class UploadFileUserComponent {

    @Input() user!: UserModel;
    @Output() fileUploaded = new EventEmitter<void>();
    selectedFile!: File;
    @Input() senderName!: any;
    @Input() senderFirstName!: any;
    @Input() userId!: number;
    @ViewChild('fileInput') fileInput: any;


    constructor(private directoryService: DirectoryService, private msg: NzMessageService, private authService: AuthService,private userNotificationService: UsernotificationService) {}

    onFileSelected(event: any) {
        this.selectedFile = event.target.files[0];
    }

    onSubmit() {
        const user = this.authService.getUser();

        if (this.selectedFile) {
            this.directoryService.uploadFileToUserFolder(this.selectedFile, this.userId, user.name, user.firstName).subscribe(response => {
                // console.log('File uploaded:', response);
                this.msg.success('Fichier téléchargé avec succès.');
                this.userNotificationService.notifyNotificationAdded();
                this.fileUploaded.emit();
                this.fileInput.nativeElement.value = '';
            }, error => {
                // console.error('Error uploading file:', error);
                this.msg.error('Erreur lors du téléchargement du fichier.');
            });
        }
    }
}
