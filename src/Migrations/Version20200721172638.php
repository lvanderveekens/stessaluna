<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200721172638 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE post DROP image_filename');
        $this->addSql('ALTER TABLE whatdoyousee_exercise DROP INDEX FK_552FC7FC3DA5256D, ADD UNIQUE INDEX UNIQ_552FC7FC3DA5256D (image_id)');
        $this->addSql('ALTER TABLE whatdoyousee_exercise DROP image_filename, CHANGE image_id image_id INT NOT NULL');
        $this->addSql('ALTER TABLE user DROP INDEX FK_8D93D6493DA5256D, ADD UNIQUE INDEX UNIQ_8D93D64986383B10 (avatar_id)');
        $this->addSql('ALTER TABLE user DROP avatar_filename');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE post ADD image_filename VARCHAR(255) CHARACTER SET utf8mb4 DEFAULT NULL COLLATE `utf8mb4_unicode_ci`');
        $this->addSql('ALTER TABLE user DROP INDEX UNIQ_8D93D64986383B10, ADD INDEX FK_8D93D6493DA5256D (avatar_id)');
        $this->addSql('ALTER TABLE user ADD avatar_filename VARCHAR(255) CHARACTER SET utf8mb4 DEFAULT NULL COLLATE `utf8mb4_unicode_ci`');
        $this->addSql('ALTER TABLE whatdoyousee_exercise DROP INDEX UNIQ_552FC7FC3DA5256D, ADD INDEX FK_552FC7FC3DA5256D (image_id)');
        $this->addSql('ALTER TABLE whatdoyousee_exercise ADD image_filename VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, CHANGE image_id image_id INT DEFAULT NULL');
    }
}
