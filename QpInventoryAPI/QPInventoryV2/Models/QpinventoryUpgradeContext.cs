using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace QPInventoryV2.Models;

public partial class QpinventoryUpgradeContext : DbContext
{
    public QpinventoryUpgradeContext()
    {
    }

    public QpinventoryUpgradeContext(DbContextOptions<QpinventoryUpgradeContext> options)
        : base(options)
    {
    }

    public virtual DbSet<MstCategory> MstCategories { get; set; }

    public virtual DbSet<MstHyperlink> MstHyperlinks { get; set; }

    public virtual DbSet<MstKeyword> MstKeywords { get; set; }

    public virtual DbSet<TranLinkKeyword> TranLinkKeywords { get; set; }

   // protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder);
//#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
//        => optionsBuilder.UseSqlServer("Server=SHIWA\\SQLEXPRESS;Database=QPInventoryUpgrade;Trusted_Connection=True;TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<MstCategory>(entity =>
        {
            entity.HasKey(e => e.CategoryId).HasName("PK__mst_cate__23CAF1D83B16A7E2");

            entity.ToTable("mst_category");

            entity.HasIndex(e => e.CategoryName, "UQ__mst_cate__37077ABD78583BE5").IsUnique();

            entity.Property(e => e.CategoryId).HasColumnName("categoryId");
            entity.Property(e => e.CategoryName)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("categoryName");
            entity.Property(e => e.Description)
                .HasMaxLength(200)
                .IsUnicode(false)
                .HasColumnName("description");
            entity.Property(e => e.Link)
                .IsUnicode(false)
                .HasColumnName("link");
        });

        modelBuilder.Entity<MstHyperlink>(entity =>
        {
            entity.HasKey(e => e.HyperlinkId).HasName("PK__mst_hype__595D09A5A1E3051A");

            entity.ToTable("mst_hyperlinks");

            entity.Property(e => e.HyperlinkId).HasColumnName("hyperlinkId");
            entity.Property(e => e.CategoryId).HasColumnName("categoryId");
            entity.Property(e => e.Hyperlink)
                .IsUnicode(false)
                .HasColumnName("hyperlink");

            entity.HasOne(d => d.Category).WithMany(p => p.MstHyperlinks)
                .HasForeignKey(d => d.CategoryId)
                .HasConstraintName("FK_mst_hyperlink_categoryId");
        });

        modelBuilder.Entity<MstKeyword>(entity =>
        {
            entity.HasKey(e => e.KeywordId).HasName("PK__mst_keyw__A6DC9B8AA1BDE41F");

            entity.ToTable("mst_keywords");

            entity.HasIndex(e => e.Keyword, "UQ__mst_keyw__3697F5A26D8436E2").IsUnique();

            entity.Property(e => e.KeywordId).HasColumnName("keywordId");
            entity.Property(e => e.Keyword)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("keyword");
        });

        modelBuilder.Entity<TranLinkKeyword>(entity =>
        {
            entity.HasKey(e => e.TrackId).HasName("PK__tran_lin__55B5F9529E4CA80D");

            entity.ToTable("tran_link_Keyword");

            entity.Property(e => e.TrackId).HasColumnName("trackId");
            entity.Property(e => e.HyperlinkId).HasColumnName("hyperlinkId");
            entity.Property(e => e.KeywordId).HasColumnName("keywordId");

            entity.HasOne(d => d.Hyperlink).WithMany(p => p.TranLinkKeywords)
                .HasForeignKey(d => d.HyperlinkId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK__tran_link__hyper__5DCAEF64");

            entity.HasOne(d => d.Keyword).WithMany(p => p.TranLinkKeywords)
                .HasForeignKey(d => d.KeywordId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK__tran_link__keywo__5FB337D6");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
