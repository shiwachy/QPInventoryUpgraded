
export class hyperlink{
    HyperlinkId:number=0;
    CategoryId:number=0;
    Hyperlink:string="";
    Keywords:Array<keyword> = new Array<keyword>();
}

export class keyword{
    KeywordId:number=0;
    Keyword:string="";
}