import {Component, OnInit} from '@angular/core';
import {DeviceModel} from "../../model/device.model";
import {DeviceService} from "../../services/device.service";
import {ActivatedRoute} from "@angular/router";
import {ApiService} from "../../services/api.service";
import {CurrencyPipe} from "@angular/common";

@Component({
    selector: 'app-single-device-displayer',
    standalone: true,
    imports: [
        CurrencyPipe
    ],
    templateUrl: './single-device-displayer.component.html',
    styleUrl: './single-device-displayer.component.css'
})
export class SingleDeviceDisplayerComponent implements OnInit {
    public devices: DeviceModel[] = [];

    id!: number;
    device: any;

    constructor(
        private readonly deviceService: DeviceService,
        private route: ActivatedRoute, private apiService: ApiService
    ) {
    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.id = params['id'];
            this.loadDeviceDetails();
        });


    }

    loadDeviceDetails() {
        this.apiService.retrieveUserById(this.id).subscribe(
            (data) => {
                this.device = data;
            },
            (error) => {
                console.error('Erreur de récupération:', error);
            }
        );
    }
}
