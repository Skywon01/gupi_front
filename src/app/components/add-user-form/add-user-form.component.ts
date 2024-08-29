import {Component, EventEmitter, Output} from '@angular/core';
import {
    AbstractControl,
    FormControl,
    FormGroup, FormsModule,
    ReactiveFormsModule, ValidationErrors,
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
import {NgForOf, NgIf} from "@angular/common";
import {UserModel} from "../../model/user.model";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {UserService} from "../../services/user.service";
import {NzAlertComponent} from "ng-zorro-antd/alert";
import {NzMessageService} from "ng-zorro-antd/message";
import {NzInputNumberComponent} from "ng-zorro-antd/input-number";

export function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    // Vérifie si les mots de passe correspondent
    return password === confirmPassword ? null : { passwordMismatch: true };
}

@Component({
    selector: 'app-add-user-form',
    standalone: true,
    imports: [
        NzFormDirective,
        ReactiveFormsModule,
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
        NzIconDirective,
        FormsModule,
        NzAlertComponent,
        NgIf,
        NzInputNumberComponent
    ],
    templateUrl: './add-user-form.component.html',
    styleUrl: './add-user-form.component.css'
})


export class AddUserFormComponent {
    passwordsMatch = true;
    @Output() userAdded: EventEmitter<UserModel> = new EventEmitter<UserModel>();
    passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    passwordVisible = false;
    password?: string;
    confirmPassword?: string;
    numbers: number[];
    form: FormGroup;

    constructor(private userService: UserService, private message: NzMessageService) {
        this.numbers = Array.from({ length: 99 }, (_, i) => i + 1);
        this.form = new FormGroup({
            name: new FormControl('', [Validators.required]),
            firstName: new FormControl('', [Validators.required]),
            email: new FormControl('', [Validators.required, Validators.email]),
            address: new FormControl(''),
            age: new FormControl(''),
            password: new FormControl('', [Validators.required, Validators.pattern(this.passwordRegex)]),
            confirmPassword: new FormControl('', [Validators.required, this.passwordMatchValidator.bind(this)]),
            role_id: new FormControl(''),
        }, { validators: passwordMatchValidator });

        this.form.get('password')?.valueChanges.subscribe(() => {
            this.form.get('confirmPassword')?.updateValueAndValidity();
        });
    }

    onSubmit() {
        if (this.form.valid && this.form.value.password === this.form.value.confirmPassword) {
            this.passwordsMatch = true;
            const formData: UserModel = this.form.value;
            this.userService.registerUser(formData).subscribe(user => {
                this.userAdded.emit(user);
                this.message.success('Utilisateur ajouté avec succès !');
            });
            this.form.reset();
        } else {
            this.passwordsMatch = false;
            Object.values(this.form.controls).forEach(control => {
                if (control.invalid) {
                    control.markAsDirty();
                    control.updateValueAndValidity({ onlySelf: true });
                }
            });
        }
    }

    passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
        if (!this.form) {
            return null;
        }
        const password = this.form.get('password')?.value;
        const confirmPassword = control.value;

        return password === confirmPassword ? null : { passwordMismatch: true };
    }
}
