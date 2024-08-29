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
    selector: 'app-list-device-owned',
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
    templateUrl: './list-device-owned.component.html',
    styleUrl: './list-device-owned.component.css'
})
export class ListDeviceOwnedComponent implements OnInit {
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
    }

    unsetDevice(deviceId: number): void {
        this.deviceService.unsetDevice(deviceId).subscribe({
            next: () => {
                // Filtrez l'appareil supprimé de la liste locale pour rafraîchir l'affichage
                this.tuyauDeDevices = this.tuyauDeDevices.filter(device => device.id !== deviceId);
                this.msg.success('L\'appareil a été dissocié avec succès.');
            },
            error: (error) => {
                console.error('Erreur lors de la dissociation de l\'appareil:', error);
                this.msg.error('Erreur lors de la dissociation de l\'appareil.');
            }
        });
    }


}
