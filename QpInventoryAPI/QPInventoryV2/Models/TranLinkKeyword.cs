using System;
using System.Collections.Generic;

namespace QPInventoryV2.Models;

public partial class TranLinkKeyword
{
    public int TrackId { get; set; }

    public int? HyperlinkId { get; set; }

    public int? KeywordId { get; set; }

    public virtual MstHyperlink? Hyperlink { get; set; }

    public virtual MstKeyword? Keyword { get; set; }
}
