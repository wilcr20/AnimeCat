import { NgModule } from '@angular/core';
import { SafePipe } from './shared/pipes/safe.pipe';
@NgModule({
    declarations: [
        SafePipe
    ],
    imports: [],
    exports: [
        SafePipe
    ]
})
export class PipesModule {}