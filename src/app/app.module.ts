import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import 'quill-emoji';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AceResponseModule } from "./shared/modules/ace-response/ace-response.module";
import { AngularEditorModule } from "@kolkov/angular-editor";
import { HttpClientModule } from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CKEditorModule } from "@ckeditor/ckeditor5-angular";

@NgModule({
  declarations: [
    AppComponent
  ],
    imports: [
        CKEditorModule,
        HttpClientModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        AceResponseModule,
        AngularEditorModule,
        FormsModule,
        ReactiveFormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
