import { Directive, ElementRef } from '@angular/core';
import { PlatformDetectorService } from 'src/app/core/platform-detector/platform-detector.service';

@Directive({
    selector: '[immediateClick]',
})
export class ImmediateClickDirective { 

    constructor(
        private elementRef: ElementRef<any>,
        private platformDetector: PlatformDetectorService,
    ) { }

    ngOnInit(): void {
        this.platformDetector.isPlatformBrowser() &&
            this.elementRef.nativeElement.click();
    }
}
