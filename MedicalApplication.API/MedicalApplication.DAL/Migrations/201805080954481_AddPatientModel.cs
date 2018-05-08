namespace ClassLibrary2.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddPatientModel : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.PatientModels",
                c => new
                    {
                        Guid = c.Guid(nullable: false, identity: true),
                        MedicGuid = c.Guid(nullable: false),
                        FirstName = c.String(nullable: false, maxLength: 100),
                        LastName = c.String(nullable: false, maxLength: 100),
                        CNP = c.String(nullable: false, maxLength: 15),
                        Sex = c.Int(nullable: false),
                        Address = c.String(),
                        DOB = c.DateTime(nullable: false),
                        Assuranced = c.Boolean(nullable: false),
                        Telephone = c.String(nullable: false, maxLength: 20),
                        PatientFile = c.String(),
                    })
                .PrimaryKey(t => t.Guid);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.PatientModels");
        }
    }
}
