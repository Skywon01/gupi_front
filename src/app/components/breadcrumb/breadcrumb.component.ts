import { Component } from '@angular/core';
import {NzBreadCrumbComponent, NzBreadCrumbItemComponent} from "ng-zorro-antd/breadcrumb";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {PageService} from "../../services/page/page.component";

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [
    NzBreadCrumbComponent,
    NzBreadCrumbItemComponent,
    NzIconDirective
  ],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.css'
})
export class BreadcrumbComponent {
    constructor(public pageService : PageService) {}
}
