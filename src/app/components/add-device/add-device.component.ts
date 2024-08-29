import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators
} from "@angular/forms";
import {
    NzFormControlComponent,
    NzFormDirective,
    NzFormItemComponent,
    NzFormLabelComponent
} from "ng-zorro-antd/form";
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";
import {NzInputDirective, NzInputGroupComponent} from "ng-zorro-antd/input";
import {NzOptionComponent, NzSelectComponent} from "ng-zorro-antd/select";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzCheckboxComponent} from "ng-zorro-antd/checkbox";
import {NgForOf} from "@angular/common";
import {DeviceModel} from "../../model/device.model";
import {NzInputNumberComponent} from "ng-zorro-antd/input-number";
import {DeviceService} from "../../services/device.service";
import {UserModel} from "../../model/user.model";
import {UserService} from "../../services/user.service";

@Component({
    selector: 'app-add-device',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        NzFormDirective,
        NzFormItemComponent,
        NzFormLabelComponent,
        NzColDirective,
        NzFormControlComponent,
        NzInputDirective,
        NzInputGroupComponent,
        NzSelectComponent,
        NzOptionComponent,
        NzRowDirective,
        NzButtonComponent,
        NzCheckboxComponent,
        NgForOf,
        NzInputNumberComponent
    ],
    templateUrl: './add-device.component.html',
    styleUrl: './add-device.component.css'
})
export class AddDeviceComponent implements OnInit{
    @Output() deviceAdded: EventEmitter<DeviceModel> = new EventEmitter<DeviceModel>();
    // numbers: number[];
    @Input() users!: UserModel[];
    form: FormGroup = new FormGroup({
        name: new FormControl('', [Validators.required]),
        price: new FormControl('', [Validators.required]),
        category: new FormControl('', [Validators.required]),
        qr_code: new FormControl(''),
        user_id: new FormControl('')
    });

    constructor(private deviceService: DeviceService, private userService: UserService) {
        // numbers n'est plus utilisé pour le moment
        // this.numbers = Array.from({length: 250000}, (_, i) => i + 1);
    }

    submitDevice() {
        if (this.form.valid) {
            const formData = {
                ...this.form.value,
                user: { id: this.form.get('user_id')?.value }
            };
            this.deviceService.registerDevice(formData).subscribe(device => {
                // console.log('Données envoyées :', formData);
                this.deviceAdded.emit(device);
                this.form.reset();
            });
        } else {
            Object.values(this.form.controls).forEach(control => {
                if (control.invalid) {
                    control.markAsDirty();
                    control.updateValueAndValidity({onlySelf: true});
                }
            });
        }
    }

    ngOnInit(): void {
        this.userService.getUsers().subscribe(users => {
            this.users = users;
        });
    }
}
