import { BaseComponent } from "./";
import { VAlign, HAlign } from "../../types";

export class LabelComponent extends BaseComponent {
    public text: string;
    public vAlign: VAlign;
    public hAlign: HAlign;
}