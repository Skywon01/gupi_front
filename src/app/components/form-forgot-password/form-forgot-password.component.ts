import { Component } from '@angular/core';
import {
    FormControl,
    FormGroup,
    FormsModule,
    NonNullableFormBuilder,
    ReactiveFormsModule,
    Validators
} from "@angular/forms";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent} from "ng-zorro-antd/form";
import {NzInputDirective, NzInputGroupComponent} from "ng-zorro-antd/input";
import {Router} from "@angular/router";
import {PasswordService} from "../../services/password.service";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-form-forgot-password',
  standalone: true,
    imports: [
        FormsModule,
        NzButtonComponent,
        NzColDirective,
        NzFormControlComponent,
        NzFormDirective,
        NzFormItemComponent,
        NzInputDirective,
        NzInputGroupComponent,
        NzRowDirective,
        ReactiveFormsModule
    ],
  templateUrl: './form-forgot-password.component.html',
  styleUrl: './form-forgot-password.component.css'
})
export class FormForgotPasswordComponent {
    validateForm: FormGroup<{
        userName: FormControl<string>;
    }> = this.fb.group({
        userName: ['', [Validators.required]]
    });

    constructor(private fb: NonNullableFormBuilder, private passwordService: PasswordService, private router: Router, private message: NzMessageService) {
    }


    forgotPassword(): void {
        if (this.validateForm.valid) {
            const email = this.validateForm.get('userName')?.value;

            this.passwordService.sendResetPasswordEmail(email).subscribe({
                next: () => {
                    this.message.success('Email de réinitialisation envoyé avec succès');
                    this.router.navigate(['/login']);
                },
                error: () => {
                    this.message.success('Email de réinitialisation envoyé avec succès');

                }
            });
        }
    }
}
