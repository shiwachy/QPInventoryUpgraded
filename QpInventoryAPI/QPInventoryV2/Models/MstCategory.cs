using System;
using System.Collections.Generic;

namespace QPInventoryV2.Models;

public partial class MstCategory
{
    public int CategoryId { get; set; }

    public string? CategoryName { get; set; }

    public string? Link { get; set; }

    public string? Description { get; set; }

    public virtual ICollection<MstHyperlink> MstHyperlinks { get; set; } = new List<MstHyperlink>();
}
