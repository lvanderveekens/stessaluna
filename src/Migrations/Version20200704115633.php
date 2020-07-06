<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200704115633 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE image (id INT AUTO_INCREMENT NOT NULL, filename VARCHAR(180) NOT NULL, mime_type VARCHAR(180) NOT NULL, UNIQUE INDEX UNIQ_C53D045F3C0BE965 (filename), UNIQUE INDEX UNIQ_C53D045F2100AA2E (mime_type), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE post ADD image_id INT DEFAULT NULL, DROP image_filename');
        $this->addSql('ALTER TABLE post ADD CONSTRAINT FK_5A8A6C8D3DA5256D FOREIGN KEY (image_id) REFERENCES image (id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_5A8A6C8D3DA5256D ON post (image_id)');
        $this->addSql('ALTER TABLE whatdoyousee_exercise ADD image_id INT DEFAULT NULL, DROP image_filename');
        $this->addSql('ALTER TABLE whatdoyousee_exercise ADD CONSTRAINT FK_552FC7FC3DA5256D FOREIGN KEY (image_id) REFERENCES image (id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_552FC7FC3DA5256D ON whatdoyousee_exercise (image_id)');
        $this->addSql('ALTER TABLE user ADD image_id INT DEFAULT NULL, DROP avatar_filename');
        $this->addSql('ALTER TABLE user ADD CONSTRAINT FK_8D93D6493DA5256D FOREIGN KEY (image_id) REFERENCES image (id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_8D93D6493DA5256D ON user (image_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE post DROP FOREIGN KEY FK_5A8A6C8D3DA5256D');
        $this->addSql('ALTER TABLE whatdoyousee_exercise DROP FOREIGN KEY FK_552FC7FC3DA5256D');
        $this->addSql('ALTER TABLE user DROP FOREIGN KEY FK_8D93D6493DA5256D');
        $this->addSql('DROP TABLE image');
        $this->addSql('DROP INDEX UNIQ_5A8A6C8D3DA5256D ON post');
        $this->addSql('ALTER TABLE post ADD image_filename VARCHAR(255) CHARACTER SET utf8mb4 DEFAULT NULL COLLATE `utf8mb4_unicode_ci`, DROP image_id');
        $this->addSql('DROP INDEX UNIQ_8D93D6493DA5256D ON user');
        $this->addSql('ALTER TABLE user ADD avatar_filename VARCHAR(255) CHARACTER SET utf8mb4 DEFAULT NULL COLLATE `utf8mb4_unicode_ci`, DROP image_id');
        $this->addSql('DROP INDEX UNIQ_552FC7FC3DA5256D ON whatdoyousee_exercise');
        $this->addSql('ALTER TABLE whatdoyousee_exercise ADD image_filename VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, DROP image_id');
    }
}
