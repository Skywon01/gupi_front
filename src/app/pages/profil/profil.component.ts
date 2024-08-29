import {Component, OnInit} from '@angular/core';
import {NzButtonComponent, NzButtonShape} from "ng-zorro-antd/button";
import {NzQRCodeComponent} from "ng-zorro-antd/qr-code";
import {PageService} from "../../services/page/page.component";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NzAlign, NzFlexDirective, NzJustify} from "ng-zorro-antd/flex";
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";
import {AuthService} from "../../services/authentification/auth.service";
import {NgIf} from "@angular/common";
import {DeviceListComponent} from "../../components/device-list/device-list.component";
import {DeviceModel} from "../../model/device.model";
import {DeviceService} from "../../services/device.service";
import {FormProfileEditComponent} from "../../components/form-profile-edit/form-profile-edit.component";
import {ListDeviceOwnedComponent} from "../../components/list-device-owned/list-device-owned.component";
import {UploadProfilePictureComponent} from "../../components/upload-profile-picture/upload-profile-picture.component";
import {apiRoot} from "../../services/api.service";
import {ProfileImageService} from "../../services/profileImage.service";


@Component({
    selector: 'app-profil',
    standalone: true,
    imports: [
        NzButtonComponent,
        NzQRCodeComponent,
        NzIconDirective,
        NzFlexDirective,
        NzRowDirective,
        NzColDirective,
        NgIf,
        DeviceListComponent,
        FormProfileEditComponent,
        ListDeviceOwnedComponent,
        UploadProfilePictureComponent
    ],
    templateUrl: './profil.component.html',
    styleUrl: './profil.component.css'
})
export class ProfilComponent implements OnInit {
    user: any;
    devices: DeviceModel[] = [];
    shape: NzButtonShape = 'round'
    showUpdateProfile: boolean = false;
    profileImageUrl: string | null = null;

    constructor(private pageService: PageService, protected authService: AuthService, private deviceService: DeviceService, private profileImageService: ProfileImageService) {
        this.pageService.setComponentType('profile', 'Mon profil', 'Veuillez trouver vos informations personnelles');
    }

    ngOnInit(): void {
        this.user = this.authService.getUser();
        if (this.user) {
            this.loadUserDevices(this.user.id);
        this.profileImageService.profileImageUpdated.subscribe(imageUrl => {
            // console.log('Réception de l\'événement avec l\'URL de l\'image :', imageUrl);
            this.profileImageUrl = imageUrl;
        });
        this.loadProfileImage();
        }
    }

    onProfileUpdate() {
        this.authService.refreshUserProfile().subscribe(
          (updatedUser) => {
            this.user = updatedUser;
            // Optionnel : Mettre à jour les appareils si nécessaire
            this.loadUserDevices(this.user.id);
          },
          (error) => {
            console.error('Erreur lors de la mise à jour du profil:', error);
          }
        );
      }
    loadUserDevices(userId: number): void {
        this.deviceService.getDevicesByUserId(userId).subscribe((devices: DeviceModel[]) => {
            this.devices = devices;
        });
    }

    loadProfileImage(): void {
        const userId = this.authService.getUser().id;
        this.profileImageUrl = `${apiRoot}/users/profile-image/${userId}`;
    }

    public justifySegment: NzJustify[] = [
        'flex-start',
        'center',
        'flex-end',
        'space-between',
        'space-around',
        'space-evenly'
    ];
    public alignSegment: NzAlign[] = ['flex-start', 'center', 'flex-end'];
    public selectedJustification = 0;
    public selectedLAlignment = 0;
}
