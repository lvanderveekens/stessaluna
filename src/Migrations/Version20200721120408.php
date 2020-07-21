<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200721120408 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql("INSERT INTO image(filename, mime_type) SELECT image_filename, 'image/jpeg' FROM post WHERE image_filename <> ''");
        $this->addSql("INSERT INTO image(filename, mime_type) SELECT image_filename, 'image/jpeg' FROM whatdoyousee_exercise WHERE image_filename <> ''");
        $this->addSql("INSERT INTO image(filename, mime_type) SELECT avatar_filename, 'image/jpeg' FROM user WHERE avatar_filename <> ''");

        $this->addSql("UPDATE post  SET image_id = (SELECT id FROM image WHERE filename = post.image_filename) WHERE image_filename <> ''");
        $this->addSql("UPDATE whatdoyousee_exercise SET image_id = (SELECT id FROM image WHERE filename = whatdoyousee_exercise.image_filename) WHERE image_filename <> ''");
        $this->addSql("UPDATE user SET avatar_id = (SELECT id FROM image WHERE filename = user.avatar_filename) WHERE avatar_filename <> ''");
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');


    }
}
