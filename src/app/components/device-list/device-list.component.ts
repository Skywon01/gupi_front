import {Component, Input, OnInit} from '@angular/core';
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzTableComponent, NzThMeasureDirective} from "ng-zorro-antd/table";
import {CurrencyPipe, NgForOf} from "@angular/common";
import {NzInputDirective} from "ng-zorro-antd/input";
import {FormsModule} from "@angular/forms";
import {NzPopconfirmDirective} from "ng-zorro-antd/popconfirm";
import {AddDeviceComponent} from "../add-device/add-device.component";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {DeviceModel} from "../../model/device.model";
import {NzUploadComponent} from "ng-zorro-antd/upload";
import {NzOptionComponent, NzSelectComponent} from "ng-zorro-antd/select";
import {UserModel} from "../../model/user.model";
import {UserService} from "../../services/user.service";
import {DeviceService} from "../../services/device.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {NzQRCodeComponent} from "ng-zorro-antd/qr-code";


@Component({
    selector: 'app-device-list',
    standalone: true,
    imports: [
        NzButtonComponent,
        NzTableComponent,
        NzThMeasureDirective,
        NgForOf,
        NzInputDirective,
        FormsModule,
        NzPopconfirmDirective,
        AddDeviceComponent,
        NzIconDirective,
        NzUploadComponent,
        CurrencyPipe,
        NzSelectComponent,
        NzOptionComponent,
        NzQRCodeComponent
    ],
    templateUrl: './device-list.component.html',
    styleUrl: './device-list.component.css'
})
export class DeviceListComponent implements OnInit {
    @Input() tuyauDeDevices!: DeviceModel[];
    @Input() users!: UserModel[];
    userMap: Map<number, string> = new Map<number, string>();

    constructor(private deviceService: DeviceService, private userService: UserService, private msg: NzMessageService) {
    }

    ngOnInit(): void {
        this.userService.getUsers().subscribe(users => {
            this.users = users;
            this.userMap = new Map(users.map(user => [user.id, user.name]));
        });

        this.deviceService.getDevices().subscribe(devices => {
            this.tuyauDeDevices = devices;
        });
    }

    updateDeviceUser(device: DeviceModel): void {
        const updatedDeviceData = {
            name: device.name,
            price: device.price,
            category: device.category,
            qr_code: device.qr_code,
            user: {id: device.user_id},
        };

        // console.log('Objet à envoyer :', updatedDeviceData);

        this.deviceService.updateDevice(device.id, updatedDeviceData).subscribe(updatedDevice => {
            // console.log('Utilisateur mis à jour pour l\'appareil :', updatedDevice);
            if (device.user_id != null) {
                const userName = this.userMap.get(device.user_id) || 'Inconnu';
        this.msg.success(`Utilisateur '${userName}' ajouté à l'appareil '${device.name}'`);
            }
        });

    }

    deleteDevice(deviceId: number): void {
        this.deviceService.deleteDevice(deviceId).subscribe({
            next: () => {
                // Filtrez l'appareil supprimé de la liste locale pour rafraîchir l'affichage
                this.tuyauDeDevices = this.tuyauDeDevices.filter(device => device.id !== deviceId);
                this.msg.success('L\'appareil a été supprimé avec succès.');
            },
            error: (error) => {
                console.error('Erreur lors de la suppression de l\'appareil:', error);
                this.msg.error('Erreur lors de la suppression de l\'appareil.');
            }
        });
    }
}
