import { Component } from '@angular/core';
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzModalComponent, NzModalContentDirective, NzModalService} from "ng-zorro-antd/modal";

@Component({
  selector: 'app-instructions',
  standalone: true,
    imports: [
        NzButtonComponent,
        NzModalComponent,
        NzModalContentDirective
    ],
  templateUrl: './instructions.component.html',
  styleUrl: './instructions.component.css'
})
export class InstructionsComponent {

}
