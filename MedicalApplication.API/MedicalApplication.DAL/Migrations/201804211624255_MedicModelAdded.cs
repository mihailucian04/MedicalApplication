namespace ClassLibrary2.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class MedicModelAdded : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.MedicModels",
                c => new
                    {
                        Guid = c.Guid(nullable: false, identity: true),
                        FirstName = c.String(),
                        LastName = c.String(),
                        Sex = c.Int(nullable: false),
                        Speciality = c.String(),
                    })
                .PrimaryKey(t => t.Guid);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.MedicModels");
        }
    }
}
