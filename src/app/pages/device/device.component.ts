import {Component, OnInit} from '@angular/core';
import {PageService} from "../../services/page/page.component";
import {DeviceListComponent} from "../../components/device-list/device-list.component";
import {ActivatedRoute} from "@angular/router";
import {DeviceService} from "../../services/device.service";
import {DeviceModel} from "../../model/device.model";
import {AddDeviceComponent} from "../../components/add-device/add-device.component";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzIconDirective} from "ng-zorro-antd/icon";

@Component({
    selector: 'app-device',
    standalone: true,
    imports: [
        DeviceListComponent,
        AddDeviceComponent,
        NzButtonComponent,
        NzIconDirective
    ],
    templateUrl: './device.component.html',
    styleUrl: './device.component.css'
})
export class DeviceComponent implements OnInit {
    public devices: DeviceModel[] = []
    show: boolean = false;

    constructor(
        private pageService: PageService,
        private readonly deviceService: DeviceService,
        private route: ActivatedRoute,
    ) {
        this.pageService.setComponentType('mobile', 'Inventaire', 'Veuillez trouver l\'inventaire de votre matériel');
    }

    async ngOnInit() {
        //Récupère l'eventuel paramètre id dans l'url
        this.route.params.subscribe(params => {
            const id = params['id']
            if (!id) {
                this.vaChercherTousLesDevices()
            } else {
                this.vaChercherUnSeulDevice(id)
            }

        })
    }

    async vaChercherTousLesDevices(): Promise<void> {
        this.devices = await this.deviceService.getDeviceAll()
        // console.log(this.devices)
    }

    async vaChercherUnSeulDevice(id: string) {
        this.devices = await this.deviceService.getDeviceOne(id)
        // console.log(this.devices)
    }

    onDeviceAdded(newDevice: DeviceModel) {
        this.devices.push(newDevice); // Mettre à jour la liste des appareils
    }
}
