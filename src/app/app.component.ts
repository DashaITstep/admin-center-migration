import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from "primeng/api";
import { FormGroup } from "@angular/forms";
// @ts-ignore
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { IPhrase } from "./shared/utils/phrase.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public Editor = ClassicEditor;
  public htmlContent: any;
  public expandedRows: { [key: number]: boolean } = {};

  public tabs = [
    { header: "Default", typeId: 1 },
    { header: "Text", typeId: 4 }
  ];

  public form = new FormGroup({});

  public questions: IPhrase[] = [{
    Cloneable: true,
    DisplayName: "Test Display Name",
    HelpInformation: "Help information for 09",
    PromptId: 365,
    SMS: {
      AttachedImages: [],
      ResponseOptions: [],
      CurrentResponses: [
        {
          PropertyModifiedResponse: 1,
          ResponseId: 496,
          ResponseTypeId: 4,
          ResponseValue: [ "text" ]
        }
      ],
      ResponseTypeId: 4
    },
    Synonyms: [],
    Tags: [
      { Tag: 'Military Housing', Color: "#162A3F" },
      { Tag: "Frequently Asked", Color: "#2469B9" }
    ],
    UserDefinable: true,
    Voice: {
      CurrentResponses: [{
        PropertyModifiedResponse: 1,
        ResponseId: 1162,
        ResponseTypeId: 1,
        ResponseValue: ["testwwwwaaaaaaaasdasdaaa"]
      }],
      ResponseOptions: [
        {
          ResponseId: 1162,
          ResponseValue: "Sorry, I do not have any information available for O10.",
          ResponseTypeId: 0,
          AttachedImages: []
        },
        {
          ResponseId: 1162,
          ResponseValue: "We salute our military and would be honored to have you as a resident.",
          ResponseTypeId: 0,
          AttachedImages: []
        }
      ],
      AttachedImages: [],
      ResponseTypeId: 0
    },
    WebChat: {
      AttachedImages: [],
      ResponseOptions: [],
      ResponseTypeId: 0,
      CurrentResponses: [
        {
          PropertyModifiedResponse: 1,
          ResponseId: 1222,
          ResponseTypeId: 2,
          ResponseValue: ["lalala"]
        }
      ]
    }
  }];

  constructor(private primengConfig: PrimeNGConfig) {}

  public ngOnInit(): void {
    this.primengConfig.ripple = true;
  }

  public toggleRow(rowId: number): void {
    this.expandedRows = {
      ...this.expandedRows,
      [rowId]: !this.expandedRows[rowId],
    };
  }
}
