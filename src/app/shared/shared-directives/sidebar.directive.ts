import {Directive, ElementRef, HostListener, Inject, Input, OnInit} from '@angular/core';
import {SidebarHelperService} from '../shared-services/sidebar-helper.service';
import {Utils} from '../utils';

@Directive({
  selector: '[appSidebarContainer]'
})
export class SidebarContainerDirective implements OnInit {
  @Input('appSidebarContainer') id: string;
  nativeEl;
  content: SidebarContentDirective;

  constructor(
    public el: ElementRef,
    private sidenavHelperService: SidebarHelperService
  ) {
    this.nativeEl = this.el.nativeElement;
    this.nativeEl.className += ' sidebar-container';
  }

  ngOnInit(): void {

  }

}

@Directive({
  selector: '[appSidebarContent]'
})
export class SidebarContentDirective {
  @Input('appSidebarContent') id: string;
  nativeEl;

  constructor(
    public el: ElementRef,
    private sidenavHelperService: SidebarHelperService,
    @Inject(SidebarContainerDirective) public container: SidebarContainerDirective
  ) {
    this.nativeEl = this.el.nativeElement;
    this.container.content = this;
    this.nativeEl.className += ' sidebar-content';
  }

  createBackdrop(): void {

  }
}

@Directive({
  selector: '[appSidebar]'
})
export class SidebarDirective implements OnInit {

  @Input() public align: 'left' | 'right' = 'left';
  @Input() public mode: 'over' | 'side' = 'side';
  @Input() id: string;
  @Input() closed: boolean;

  public width;
  public nativeEl: any;
  public containerNativeEl: any;
  public contentNativeEl: any;

  constructor(
    private el: ElementRef,
    private sidenavHelperService: SidebarHelperService,
    @Inject(SidebarContainerDirective) public container: SidebarContainerDirective
  ) {
    this.nativeEl = this.el.nativeElement;
    this.containerNativeEl = this.container.el.nativeElement;
    this.contentNativeEl = this.container.content.el.nativeElement;
    this.nativeEl.className += ' sidebar';
  }

  ngOnInit(): void {
    this.width = this.el.nativeElement.offsetWidth + 'px';
    this.sidenavHelperService.setSidenav(this.id, this);
    this.initSidebar();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event): void {
    this.initSidebar();
  }

  open(): void {
    if (this.align === 'left') {
      this.nativeEl.style.left = 0;
      if (!Utils.isMobile()) {
        this.contentNativeEl.style.marginLeft = this.width;
      }
    } else if (this.align === 'right') {
      this.nativeEl.style.right = 0;
      if (!Utils.isMobile()) {
        this.contentNativeEl.style.marginRight = this.width;
      }
    }
    this.closed = false;
  }

  close(): void {
    if (this.align === 'left') {
      this.nativeEl.style.left = '-' + this.width;
      this.contentNativeEl.style.marginLeft = 0;
    } else if (this.align === 'right') {
      this.nativeEl.style.right = '-' + this.width;
      this.contentNativeEl.style.marginRight = 0;
    }
    this.closed = true;
  }

  toggle(): void {
    if (this.closed) {
      this.open();
    } else {
      this.close();
    }
  }

  private initSidebar(): void {
    this.closed = Utils.isMobile();
    if (this.closed) {
      this.close();
    } else {
      this.open();
    }
  }

}


@Directive({
  selector: '[appSidebarToggler]'
})
export class SidebarTogglerDirective {
  @Input('appSidebarToggler') id;

  constructor(
    private sidenavHelperService: SidebarHelperService
  ) {
  }

  @HostListener('click')
  onClick(): void {
    this.sidenavHelperService.getSidenav(this.id).toggle();
  }
}
