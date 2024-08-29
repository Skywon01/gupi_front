import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {DirectoryService} from "../../services/directory.service";
import {DirectoryModel} from "../../model/directory.model";
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent} from "ng-zorro-antd/form";
import {NzInputDirective, NzInputGroupComponent} from "ng-zorro-antd/input";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzColDirective} from "ng-zorro-antd/grid";

@Component({
    selector: 'app-form-create-directory',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        NzFormDirective,
        NzFormItemComponent,
        NzFormControlComponent,
        NzInputGroupComponent,
        NzFormLabelComponent,
        NzButtonComponent,
        NzInputDirective,
        NzColDirective
    ],
    templateUrl: './form-create-directory.component.html',
    styleUrl: './form-create-directory.component.css'
})
export class FormCreateDirectoryComponent {
    createDirectoryForm: FormGroup;
    @Output() directoryCreated = new EventEmitter<DirectoryModel>();

    constructor(private fb: FormBuilder, private directoryService: DirectoryService) {
        this.createDirectoryForm = this.fb.group({
            name: ['', [Validators.required]]
        });
    }

    onSubmit() {
        if (this.createDirectoryForm.valid) {
            const directoryName = this.createDirectoryForm.value.name;
            this.directoryService.createDirectory(directoryName).subscribe(response => {
                // console.log('Directory created:', response);
                this.directoryCreated.emit(response);
                this.createDirectoryForm.reset();
            }, error => {
                console.error('Error creating directory:', error);
            });
        }
    }
}
