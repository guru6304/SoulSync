"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("memory_media", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },

      memory_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "memories",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },

      uploaded_by: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },

      media_type: {
        type: Sequelize.ENUM("image", "video", "audio"),
        allowNull: false,
      },

      file_url: {
        type: Sequelize.STRING(2048),
        allowNull: false,
      },

      public_id: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },

      thumbnail_url: {
        type: Sequelize.STRING(2048),
        allowNull: true,
      },

      mime_type: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },

      original_name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },

      file_size: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },

      duration: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      display_order: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },

      created_at: {
    allowNull: false,
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
},

updated_at: {
    allowNull: false,
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal(
        'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
    ),
},
    });

    await queryInterface.addIndex("memory_media", ["memory_id"]);

    await queryInterface.addIndex("memory_media", ["uploaded_by"]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("memory_media");

    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_memory_media_media_type";',
    );
  },
};
