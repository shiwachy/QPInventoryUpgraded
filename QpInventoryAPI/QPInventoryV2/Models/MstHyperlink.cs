using System;
using System.Collections.Generic;

namespace QPInventoryV2.Models;

public partial class MstHyperlink
{
    public int HyperlinkId { get; set; }

    public string? Hyperlink { get; set; }

    public int? CategoryId { get; set; }

    public virtual MstCategory? Category { get; set; }

    public virtual ICollection<TranLinkKeyword> TranLinkKeywords { get; set; } = new List<TranLinkKeyword>();
}
