import { Component } from '@angular/core';
import {LoginFormComponent} from "../../components/login-form/login-form.component";
import {NzAlign, NzFlexDirective, NzJustify} from "ng-zorro-antd/flex";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {InstructionsComponent} from "../../components/instructions/instructions.component";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzModalComponent, NzModalContentDirective, NzModalService} from "ng-zorro-antd/modal";

@Component({
  selector: 'app-login',
  standalone: true,
    imports: [
        LoginFormComponent,
        NzFlexDirective,
        NzIconDirective,
        InstructionsComponent,
        NzButtonComponent,
        NzModalComponent,
        NzModalContentDirective
    ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
    isVisible = false;
    isVertical = true;
constructor(private modal: NzModalService){}
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

    showModal(): void {
        this.isVisible = true;
    }

    handleOk(): void {
        // console.log('Button ok clicked!');
        this.isVisible = false;
    }

    handleCancel(): void {
        // console.log('Button cancel clicked!');
        this.isVisible = false;
    }
}
