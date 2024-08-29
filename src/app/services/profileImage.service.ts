import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ProfileImageService {
    profileImageUpdated = new EventEmitter<string>();

    emitProfileImageUpdate(imageUrl: string): void {
        // console.log('Émission de l\'événement avec l\'URL de l\'image :', imageUrl);
        this.profileImageUpdated.emit(imageUrl);
    }
}
