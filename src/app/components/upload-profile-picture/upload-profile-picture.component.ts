import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../services/authentification/auth.service";
import {apiRoot, httpoptions} from "../../services/api.service";
import {ProfileImageService} from "../../services/profileImage.service";
import {NzIconDirective} from "ng-zorro-antd/icon";

@Component({
  selector: 'app-upload-profile-picture',
  standalone: true,
    imports: [
        NzIconDirective
    ],
  templateUrl: './upload-profile-picture.component.html',
  styleUrl: './upload-profile-picture.component.css'
})
export class UploadProfilePictureComponent implements OnInit {
    selectedFile: File | null = null;
    profileImageUrl: string | null = null;

    constructor(private http: HttpClient, private authService: AuthService, private profileImageService: ProfileImageService) {}

    ngOnInit() {
        this.loadProfileImage();
        this.profileImageService.profileImageUpdated.subscribe(imageUrl => {
            // console.log('Réception de l\'événement avec l\'URL de l\'image :', imageUrl);
            this.profileImageUrl = imageUrl;
        });
    }

    onFileSelected(event: any): void {
        this.selectedFile = event.target.files[0];
    }

    onUpload(): void {
        if (!this.selectedFile) {
            return;
        }

        const formData = new FormData();
        formData.append('image', this.selectedFile);

        this.http.post(`${apiRoot}/users/${this.authService.getUser().id}/profile-image`, formData, httpoptions)
            .subscribe(
                (response: any) => {
                    // console.log('Upload réussi', response);
                    const imageUrl = `${apiRoot}/users/profile-image/${this.authService.getUser().id}`;
                    this.profileImageService.emitProfileImageUpdate(imageUrl);
                    window.location.reload();
                },
                (error) => {
                    // console.error('Erreur lors de l\'upload', error);
                }
            );
    }
    loadProfileImage(): void {
        const userId = this.authService.getUser().id;
        this.profileImageUrl = `${apiRoot}/users/profile-image/${userId}`;
    }
}
